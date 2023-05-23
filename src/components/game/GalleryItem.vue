<script setup lang="ts">
import type { Card, Player } from "@/model/Model";
import AvatarCard from "@/components/game/AvatarCard.vue";
import PokerCard from "@/components/game/PokerCard.vue";
import { ref } from "vue";
import { eventService } from "@/services/EventService";
import { useSessionStore } from "@/stores/stores";

const props = defineProps<{
  player: Player
  card?: Card,
  hidden?: boolean,
  minBadge?: boolean,
  maxBadge?: boolean
}>();
const sessionStore = useSessionStore()

const card = ref<Card | null>(props.card || null);
const hideCard = ref<boolean>(props.hidden !== false);

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
      <span v-if="minBadge" class="badge badge-min">Minimum</span>
      <span v-if="maxBadge" class="badge badge-max">Maximum</span>
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
.badge {
  display: inline-block;
  width: 100%;
  text-align: center;
}
.badge-min {
  background-color: #008000;
}
.badge-max {
  background-color: #ff0000;
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
