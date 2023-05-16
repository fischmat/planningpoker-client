import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Player } from '@/model/Model'

export const usePlayerStore = defineStore('player', () => {
  const currentPlayer = ref<Player | null>(null)

  return { currentPlayer }
})
