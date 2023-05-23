<script setup lang="ts">
import { gameService } from '@/services/GameService';
import { playerService } from '@/services/PlayerService';
import { useSessionStore } from '@/stores/stores';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const sessionStore = useSessionStore()
const router = useRouter()
const route = useRoute()

const password = ref('')
const passwordValid = ref(true)
const gameId = route.query.gameId as string | undefined

// Methods

async function onSubmit() {
  try {
    await gameService.joinGame(gameId!!, password.value)
    sessionStore.password = password.value
    await router.push({ name: 'game', query: { gameId: sessionStore.currentGame?.id } })
  } catch {
    passwordValid.value = false
    password.value = ''
  }
}

// Initialization

async function init() {
  if (!gameId) {
    await router.push({ path: '/' })
    return
  }

  sessionStore.currentGame = await gameService.getGame(gameId)

  if (!playerService.getPlayer()) {
    await router.push({ name: 'edit-player' })
    return
  }
}
</script>


<template>
  <div class="game-setup">
    <div class="settings">
      <h1>Enter Password</h1>

      <div>
        <p>This game is protected by a password. Please enter it to continue.</p>

        <div class="form-group" style="display: inline-block">
          <label>Password:</label>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">🔒</span>
            <input id="game-password" type="password" v-model="password" class="form-control" placeholder="Password" aria-label="Password"
              aria-describedby="addon-wrapping" />
          </div>
          <div class="invalid-feedback" :style="{ 'display': !passwordValid ? 'block' : 'none' }">
            The provided password is wrong.
          </div>
        </div>
      </div>
      <div>
        <button class="btn btn-primary" @click="onSubmit">Enter</button>
      </div>
    </div>
  </div>
</template>
  
<style></style>
  