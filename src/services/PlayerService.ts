import _ from "lodash";
import { api, apiBaseUrl } from "./API";
import type { ApplicationInfo, AvatarProps, Player, PlayerStub } from "@/model/Model";
import { useSessionStore } from "@/stores/stores";

const sessionStore = useSessionStore()

export const playerService = {
  async getPlayer(): Promise<Player | null> {
    // Try to reprovision player from stored stub
    const reprovisioned = await this.tryReprovisionPlayer()
    if (reprovisioned) {
      return reprovisioned
    }

    try {
      return (await api.get('/v1/players/me')).data
    } catch {
      return null
    }
  },

  async createOrUpdatePlayer(stub: PlayerStub): Promise<Player> {
    return (await api.post('/v1/players', stub)).data
  },

  async updatePlayer(stub: PlayerStub): Promise<Player> {
    return (await api.patch('/v1/players', stub)).data
  },

  getAvatarPreview(props: AvatarProps): string {
    const queryParams = [
      `backgroundColor=${props.backgroundColor}`,
      `eyebrows=${props.eyebrows}`,
      `eyes=${props.eyes}`,
      `longHair=${props.longHair}`,
      `hairColor=${props.hairColor}`,
      `mouth=${props.mouth}`,
      `skinColor=${props.skinColor}`,
      `features=`
    ];
    if (props.earrings) {
        queryParams.push(`earrings=${props.earrings}`)
    }
    if (props.glasses) {
        queryParams.push(`glasses=${props.glasses}`)
    }
    if (props.hair) {
        queryParams.push(`hair=${props.hair}`)
    }
    
    const queryString = _.join(queryParams, "&");

    return `${apiBaseUrl}/v1/players/avatar/preview?${queryString}`;
  },

  async tryReprovisionPlayer(): Promise<Player | null> {
    const stub = sessionStore.persistedPlayerStub()
    if (!stub) {
      return null
    }
    try {
      return await this.createOrUpdatePlayer(stub)
    } catch {
      return null
    }
  }
};
