<script setup lang="ts">
import { ref, watch } from "vue";
import _ from "lodash";
import PokerCard from "./PokerCard.vue";
import type { Card } from "@/model/Model";

const props = defineProps<{
  cards: Card[];
}>();

const emit = defineEmits<{
  (e: "update", value: Card | undefined): void;
}>();

// Data
const cardVisibility = ref(_.fromPairs(_.map(props.cards, (card) => [card.value, true])));
const activeCard = ref<Card | undefined>(undefined);

// Methods

function playCard(card: Card) {
  if (activeCard.value?.value === card.value) {
    // Show all cards again
    props.cards.forEach((c) => (cardVisibility.value[c.value] = true));
    activeCard.value = undefined;
    emit("update", undefined);
  } else {
    // Hide other cards
    props.cards
      .filter((c) => c !== card)
      .forEach((c) => (cardVisibility.value[c.value] = false));
    // Set as active card and emit event
    activeCard.value = card;
    emit("update", card);
  }
}

function isHidden(card: Card) {
  return !cardVisibility.value[card.value];
}

function isActiveCard(card: Card) {
  return activeCard.value && card.value == activeCard.value?.value;
}

function isInactiveCard(card: Card) {
  return activeCard.value && card.value != activeCard.value?.value;
}

function peekCard(card: Card, visible: boolean) {
  if (activeCard.value !== undefined && activeCard.value !== card) {
    cardVisibility.value[card.value] = visible;
  }
}

watch(() => props.cards, (cards) => {
  cardVisibility.value = _.fromPairs(_.map(cards, (card) => [card.value, true]))
})
</script>

<template>
  <div class="deck-container">
    <div class="deck">
      <div class="row">
        <div v-for="card in cards" v-bind:key="card.value" class="col">
          <PokerCard
            @mouseover="peekCard(card, true)"
            @mouseleave="peekCard(card, false)"
            class="card"
            :class="{ inactive: isInactiveCard(card), active: isActiveCard(card) }"
            :hidden="isHidden(card)"
            :card="card"
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
