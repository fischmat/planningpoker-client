<script setup lang="ts">
import type { Card, Player } from "@/model/Model";
import AvatarCard from "@/components/AvatarCard.vue";
import PokerCard from "@/components/PokerCard.vue";
import { ref } from "vue";
import { eventService } from "@/services/EventService";
import { useSessionStore } from "@/stores/stores";

const props = defineProps<{
  player: Player;
}>();
const sessionStore = useSessionStore()

const card = ref<Card | null>(null);
const hideCard = ref<boolean>(true);

eventService.onVoteSubmitted((event) => {
  if (
    event.gameId == sessionStore.currentGame?.id &&
    event.round.id == sessionStore.currentRound?.id &&
    event.vote.player.id == props.player.id
  ) {
    card.value = event.vote.card;
    if (sessionStore.currentPlayer?.id == event.vote.player.id) {
      hideCard.value = false
    }
  }
});

eventService.onVoteRevoked((event) => {
  if (
    event.gameId == sessionStore.currentGame?.id &&
    event.round.id == sessionStore.currentRound?.id &&
    event.vote.player.id == props.player.id
  ) {
    card.value = null;
  }
});

eventService.onRoundEnded((event) => {
  if (
    event.gameId == sessionStore.currentGame?.id &&
    event.round.id == sessionStore.currentRound?.id
  ) {
    hideCard.value = false;
  }
});

eventService.onRoundStarted((event) => {
  if (
    event.gameId == sessionStore.currentGame?.id &&
    event.round.id == sessionStore.currentRound?.id
  ) {
    hideCard.value = true;
    card.value = null;
  }
});

</script>

<template>
  <div class="player">
    <div class="avatar-container">
      <AvatarCard :avatar="player.avatar" />
      <span class="name">{{ player.name }}</span>
    </div>
    <div>
      <PokerCard v-if="card" :card="card" :hidden="hideCard" />
    </div>
  </div>
</template>

<style scoped>
.player {
  position: absolute;
}

.avatar-container {
  width: 150px;
}

.name {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-weight: 500;
  color: #444;
}

.card {
  width: 70px;
  height: 100px;
  position: absolute;
  top: 0;
  right: -60px;
  rotate: 10deg;
}
</style>
