import { api } from "./API"
import type { GameStub, Game } from "./Model"

export const gameService = {

    async createGame(gameStub: GameStub): Promise<Game> {
        return (await api.post(`v1/games`, gameStub)).data
    }
}