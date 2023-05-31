<script setup lang="ts">
import { computed, defineComponent } from "vue";
import _ from "lodash";
import type { Card } from "@/model/Model";

const props = defineProps<{
  card: Card,
  hidden: boolean,
  cardLogoUrl?: string
}>();

const emit = defineEmits(['click']);

function cardIcon(card: number) {
  const icons = ["♣", "♠", "♥", "♦"];
  return icons[props.card.value % icons.length];
}
</script>

<template>
  <div class="card" :class="{ hidden: hidden }" @click="emit('click')">
    <div v-if="!hidden">
      <span class="corner top-left">{{ card.value }}</span>
      <span class="corner top-right">{{ cardIcon(card.value) }}</span>
      <span class="title">{{ card.value }}</span>
      <span class="corner bottom-left">{{ cardIcon(card.value) }}</span>
      <span class="corner bottom-right">{{ card.value }}</span>
    </div>
    <div v-else>
      <img
        class="logo"
        :src="cardLogoUrl"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

.hidden {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23F3F3F3' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E");
}

.hidden .logo {
  width: 50px;
  filter: grayscale(10%);
}

.title {
  font-size: 30pt;
  vertical-align: middle;
  display: inline-block;
  line-height: normal;
}

.corner {
  font-size: 15pt;
  font-weight: 200;
  position: absolute;
}

.corner.top-left {
  top: 0;
  left: 0;
  margin-left: 10px;
  margin-top: 7px;
}

.corner.top-right {
  top: 0;
  right: 0;
  margin-right: 10px;
  margin-top: 7px;
}

.corner.bottom-left {
  bottom: 0;
  left: 0;
  margin-left: 10px;
  margin-bottom: 7px;
}

.corner.bottom-right {
  bottom: 0;
  right: 0;
  margin-right: 10px;
  margin-bottom: 7px;
}
</style>
