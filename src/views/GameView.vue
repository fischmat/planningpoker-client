<script setup lang="ts">
import CardDeck from '@/components/CardDeck.vue';
import PlayerGallery from '@/components/PlayerGallery.vue';
import type { Player } from '@/model/Model';

const cards = [
  { value: 1 },
  { value: 3 },
  { value: 5 },
  { value: 8 },
  { value: 13 },
  { value: 21 },
];
const players: Player[] = [
  {
    id: "abcd",
    name: "Fisch",
    gameIds: [],
    avatar: {
      backgroundColor: "transparent",
      earrings: null,
      eyebrows: 1,
      eyes: 1,
      features: [],
      glasses: null,
      hair: 1,
      longHair: false,
      hairColor: "000000",
      mouth: 1,
      skinColor: "ffdbac"
    }
  }
]

</script>


<template>
  <div>
    <div class="board">
      <PlayerGallery :players="players" />
    </div>
    <CardDeck :cards="cards" />
  </div>
</template>
  
<style>
.board {
  margin-top: 10%;
  height: 90vh;
}
</style>
  