<script setup lang="ts">
import type { Card, Player } from "@/model/Model";
import AvatarCard from "@/components/game/AvatarCard.vue";
import PokerCard from "@/components/game/PokerCard.vue";
import { ref, toRefs } from "vue";
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

const { player, card, hidden, minBadge, maxBadge } = toRefs(props)

const hideCard = ref<boolean>(props.hidden !== false);
</script>

<template>
  <div class="player">
    <div class="avatar-container">
      <AvatarCard :avatar="player.avatar" />
      <span class="name">{{ player.name }}</span>
      <span v-if="minBadge" class="badge badge-min">Minimum</span>
      <span v-if="maxBadge" class="badge badge-max">Maximum</span>
      <PokerCard class="card" v-if="card" :card="card" :hidden="hideCard" />
    </div>
    <div>
      
    </div>
  </div>
</template>

<style scoped>
.avatar-container {
  width: 150px;
  position: relative;
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
  top: -20px;
  right: -35px;
  rotate: 10deg;
}
</style>
