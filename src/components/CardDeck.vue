<script setup lang="ts">
import { ref } from "vue";
import _ from "lodash";
import PokerCard from "./PokerCard.vue";

const props = defineProps<{
  cards: number[];
}>();

const emit = defineEmits<{
  (e: "update", value: number | undefined): void;
}>();

// Data
const cardVisibility = ref(
  _.fromPairs(_.map(props.cards, (card) => [card, true]))
);
const activeCard = ref<number | undefined>(undefined);

// Methods

function playCard(card: number) {
  if (activeCard.value === card) {
    // Show all cards again
    props.cards.forEach((c) => (cardVisibility.value[c] = true));
    activeCard.value = undefined;
    emit("update", undefined);
  } else {
    // Hide other cards
    props.cards
      .filter((c) => c !== card)
      .forEach((c) => (cardVisibility.value[c] = false));
    // Set as active card and emit event
    activeCard.value = card;
    emit("update", card);
  }
}

function isHidden(card: number) {
  return !cardVisibility.value[card];
}

function isActiveCard(card: number) {
  return activeCard && card == activeCard.value;
}

function isInactiveCard(card: number) {
  return activeCard && card != activeCard.value;
}

function peekCard(card: number, visible: boolean) {
  if (activeCard.value !== undefined && activeCard.value !== card) {
    cardVisibility.value[card] = visible;
  }
}
</script>

<template>
  <div class="deck-container">
    <div class="deck">
      <div class="row">
        <div v-for="card in cards" v-bind:key="card" class="col">
          <PokerCard
            @mouseover="peekCard(card, true)"
            @mouseleave="peekCard(card, false)"
            class="card"
            :class="{ inactive: isInactiveCard(card), active: isActiveCard(card) }"
            :hidden="isHidden(card)"
            :value="card"
            @click="playCard(card)"
            logo="https://cdn.freebiesupply.com/logos/large/2x/acme-logo-png-transparent.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deck-container {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.deck {
  width: 90%;
  min-height: 40px;
  margin: 0 auto;
}

.card:hover {
  rotate: 5deg;
  transform: translateY(-20px);
  box-shadow: 5px 5px 12px 2px rgba(0, 0, 0, 0.34);
  cursor: pointer;
}

.card.inactive:hover {
  filter: opacity(70%);
}

.card.active {
  top: -150px;
  rotate: 30deg;
}
</style>
