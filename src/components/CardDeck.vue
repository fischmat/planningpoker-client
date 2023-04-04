<script setup lang="ts">
import { computed, defineComponent } from "vue";
import _ from "lodash";

const props = defineProps<{
  cards: number[];
}>();

function cardIcon(card: number) {
  const icons = ["♣", "♠", "♥", "♦"];
  const cardIdx = _.indexOf(this.props.cards, card);
  return icons[cardIdx % icons.length];
}
</script>

<template>
  <div class="deck-container">
    <div class="deck">
      <div class="row">
        <div v-for="card in cards" v-bind:key="card" class="col">
          <div class="card">
            <span class="corner top-left">{{ card }}</span>
            <span class="corner top-right">{{ cardIcon(card) }}</span>
            <span class="title">{{ card }}</span>
            <span class="corner bottom-left">{{ cardIcon(card) }}</span>
            <span class="corner bottom-right">{{ card }}</span>
          </div>
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
  width: 50%;
  min-height: 40px;
  margin: 0 auto;
}

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

.card:hover {
  rotate: 5deg;
  transform: translateY(-20px);
  box-shadow: 5px 5px 12px 2px rgba(0, 0, 0, 0.34);
  cursor: pointer;
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
