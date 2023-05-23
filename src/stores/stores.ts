import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Game, Round, Player, PasswordNote, PlayerStub } from '@/model/Model'

export const useSessionStore = defineStore('player', {
  state: () => {
    const currentPlayer = ref<Player | null>(null)
    const currentGame = ref<Game | null>(null)
    const currentRound = ref<Round | null>(null)
    const password = ref<string | null>(null)
  
    return { currentPlayer, currentGame, currentRound, password }
  },
  actions: {
    persistPlayer() {
      let stub: PlayerStub | null
      if (!this.currentPlayer) {
        stub = null
      } else {
        stub = {
          name: this.currentPlayer.name,
          avatar: this.currentPlayer.avatar
        }
      }
      localStorage.setItem('playerStub', JSON.stringify(stub))
    },

    persistedPlayerStub(): PlayerStub | null {
      const stubJson = localStorage.getItem('playerStub')
      if (!stubJson) {
        return null
      }
      return JSON.parse(stubJson) as PlayerStub
    }
  }
});
