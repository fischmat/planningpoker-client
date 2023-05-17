import { api } from "./API"
import type { GameStub, Game, Card, Vote } from "@/model/Model"

export const gameService = {

    async createGame(gameStub: GameStub): Promise<Game> {
        return (await api.post(`/v1/games`, gameStub)).data
    },

    async submitVote(gameId: string, roundId: string, card: Card): Promise<Vote> {
        return (await api.post(`/v1/games/${gameId}/rounds/${roundId}/votes`, card)).data
    },

    async revokeVote(gameId: string, roundId: string): Promise<any> {
        return await api.delete(`/v1/games/${gameId}/rounds/${roundId}/votes/mine`)
    }
}