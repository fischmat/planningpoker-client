import _ from "lodash";
import { api, apiBaseUrl } from "./API";
import type { ApplicationInfo, AvatarProps, Player, PlayerStub } from "@/model/Model";
import { useSessionStore } from "@/stores/stores";

const sessionStore = useSessionStore()

export const playerService = {
  hairColors: ['aa8866', 'debe99', '241c11', '4f1a00', '9a3300', 'fbe7a1', '505050', 'dc95dc', '50b4ff', '11642f'],
  skinColors: ['ffdbac', 'f1c27d', 'e0ac69', 'c68642', '8d5524', '3b2219'],

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

  getRandomAvatarProps(): AvatarProps {
    const longHair = _.random(1, 2) % 2 == 0;
    const hairColor = _.shuffle(this.hairColors)[0];
    const skinColor = _.shuffle(this.skinColors)[0];
    return {
      backgroundColor: "transparent",
      earrings: _.random(1, 6),
      eyebrows: _.random(1, 15),
      eyes: _.random(1, 26),
      features: [],
      glasses: _.random(1, 5),
      hair: longHair ? _.random(1, 26) : _.random(1, 19),
      longHair: longHair,
      hairColor: hairColor,
      mouth: _.random(1, 30),
      skinColor: skinColor
    };
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
