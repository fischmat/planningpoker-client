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
import { useRouter } from 'vue-router';

const cards = [
  { value: 1 },
  { value: 3 },
  { value: 5 },
  { value: 8 },
  { value: 13 },
  { value: 21 },
];
const players = ref<Player[]>([])

const sessionStore = useSessionStore()
const router = useRouter()

// Initalization

playerService.getPlayer()
  .then((player) => {
    if (player == null) {
      // Send to player creation if no session yet
      router.push({ name: 'edit-player' });
    }
  })

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
  