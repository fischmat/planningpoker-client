import { sha512 } from "js-sha512";
import { api } from "./API";
import type { GameStub, Game, Card, Vote, Player } from "@/model/Model";

export const gameService = {
  async createGame(gameStub: GameStub): Promise<Game> {
    return (await api.post(`/v1/games`, gameStub)).data;
  },

  async getGame(gameId: string): Promise<Game | null> {
    try {
      return (await api.get(`/v1/games/${gameId}`)).data;
    } catch {
      return null;
    }
  },

  async getPlayers(gameId: string): Promise<Player[]> {
    return (await api.get(`/v1/games/${gameId}/players`)).data;
  },

  async joinGame(gameId: string, password: string | null): Promise<Player> {
    let headers = undefined;
    if (password) {
      const token = sha512(password);
      headers = { Authorization: `Bearer ${token}` };
    }
    return await api.post(`/v1/games/${gameId}/players`, null, { headers });
  },

  async submitVote(gameId: string, roundId: string, card: Card): Promise<Vote> {
    return (await api.post(`/v1/games/${gameId}/rounds/${roundId}/votes`, card))
      .data;
  },

  async revokeVote(gameId: string, roundId: string): Promise<any> {
    return await api.delete(`/v1/games/${gameId}/rounds/${roundId}/votes/mine`);
  },
};
