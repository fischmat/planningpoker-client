<script setup lang="ts">
import type { Card, Player } from "@/model/Model";
import AvatarCard from "@/components/AvatarCard.vue";
import PokerCard from "@/components/PokerCard.vue";
import { computed } from "vue";

const props = defineProps<{
  player: Player;
}>();

const card = computed(() => {
  return { value: 5 } as Card;
});

const hideCard = computed(() => {
  return true;
});
</script>

<template>
  <div class="player">
    <div class="avatar-container">
      <AvatarCard :avatar="player.avatar" />
      <span class="name">{{ player.name }}</span>
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
