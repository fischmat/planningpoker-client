import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Game, Round, Player, PasswordNote } from '@/model/Model'

export const useSessionStore = defineStore('player', () => {
  const currentPlayer = ref<Player | null>(null)
  const currentGame = ref<Game & PasswordNote | null>(null)
  const currentRound = ref<Round | null>(null)

  return { currentPlayer, currentGame, currentRound }
});
