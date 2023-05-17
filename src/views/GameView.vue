<script setup lang="ts">
import CardDeck from '@/components/CardDeck.vue';
import PlayerGallery from '@/components/PlayerGallery.vue';
import type { Card, Player } from '@/model/Model';
import { eventService } from '@/services/EventService';
import { gameService } from '@/services/GameService'
import { playerService } from '@/services/PlayerService';
import { useSessionStore } from '@/stores/stores';
import _ from 'lodash';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const cards = ref<Card[]>([]);
const players = ref<Player[]>([])

const sessionStore = useSessionStore()
const router = useRouter()
const route = useRoute()

// -------------
// Initalization
// -------------

async function init(): Promise<any> {
  // Set current game from URL params
  if (route.query.gameId) {
    sessionStore.currentGame = await gameService.getGame(route.query.gameId as string);
  }

  // Go to index if no game is active yet
  if (!sessionStore.currentGame) {
    await router.push({ path: "/" })
    return
  }

  // Set player
  sessionStore.currentPlayer = await playerService.getPlayer()
  if (!sessionStore.currentPlayer) {
    await router.push({ name: 'edit-player' });
    return
  }

  const isPlayerInGame = _.some(sessionStore.currentPlayer?.gameIds, (id) => id == sessionStore.currentGame?.id);

  // Check password
  if (sessionStore.currentGame?.hasPassword && (!isPlayerInGame || !sessionStore.password)) {
      await router.push({ name: "game-password", query: { gameId: sessionStore.currentGame.id } })
      return
  }

  // Enter the game
  sessionStore.currentPlayer = await gameService.joinGame(sessionStore.currentGame.id!!, sessionStore.password || null)
  await eventService.enterGame(sessionStore.currentGame.id!!, sessionStore.password || null)

  cards.value = sessionStore.currentGame?.playableCards || []
  players.value = await gameService.getPlayers(sessionStore.currentGame?.id!!); // FIXME

  // Register for events

  eventService.onPlayerJoined((event) => {
    if (event.gameId == sessionStore.currentGame?.id) {
      players.value.push(event.player);
    }
  });
  eventService.onPlayerLeft((event) => {
    if (event.gameId == sessionStore.currentGame?.id) {
      _.remove(players.value, (p) => p.id == event.player.id)
    }
  });
  eventService.onRoundStarted((event) => {
    sessionStore.currentRound = event.round
  });
  eventService.onRoundEnded((event) => {
    sessionStore.currentRound = null
  });
}

init().then(() => {
  console.log("Game successfully initialized!")
})
  .catch((e) => {
    console.error("Error while initilizing game.", e)
  })


// Methods

function onCardPlayed(card: Card | undefined) {
  if (!sessionStore.currentGame || !sessionStore.currentRound) {
    console.error("No round is currently ongoing.");
  }
  if (card) {
    gameService.submitVote(sessionStore.currentGame?.id!!, sessionStore.currentRound?.id!!, card)
  } else {
    gameService.revokeVote(sessionStore.currentGame?.id!!, sessionStore.currentRound?.id!!)
  }
}

</script>


<template>
  <div>
    <div class="board">
      <PlayerGallery :players="players" />
    </div>
    <CardDeck :cards="cards" @update="onCardPlayed" />
  </div>
</template>
  
<style>
.board {
  margin-top: 10%;
  height: 90vh;
}
</style>
  