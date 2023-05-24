import { sha512 } from "js-sha512";
import { api } from "./API";
import type { GameStub, Game, Card, Vote, Player, Round, RoundStub, RoundResult } from "@/model/Model";

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
    return (await api.post(`/v1/games/${gameId}/players`, null, { headers })).data;
  },

  async startRound(gameId: string, stub: RoundStub): Promise<Round> {
    return (await api.post(`/v1/games/${gameId}/rounds`, stub)).data;
  },

  async endRound(gameId: string, roundId: string): Promise<Round> {
    return (await api.delete(`/v1/games/${gameId}/rounds/${roundId}`)).data;
  },

  async getRoundResults(gameId: string, roundId: string): Promise<RoundResult> {
    return (await api.get(`/v1/games/${gameId}/rounds/${roundId}/results`)).data
  },

  async getCurrentRound(gameId: string): Promise<Round | null> {
    try {
      return (await api.get(`/v1/games/${gameId}/rounds/current`)).data
    } catch {
      return null
    }
  },

  async submitVote(gameId: string, roundId: string, card: Card): Promise<Vote> {
    return (await api.post(`/v1/games/${gameId}/rounds/${roundId}/votes`, card))
      .data;
  },

  async revokeVote(gameId: string, roundId: string): Promise<any> {
    return await api.delete(`/v1/games/${gameId}/rounds/${roundId}/votes/mine`);
  },

  async getVotes(gameId: string, roundId: string): Promise<Vote[]> {
    return (await api.get(`/v1/games/${gameId}/rounds/${roundId}/votes`)).data;
  }
};
