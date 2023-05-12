<script setup lang="ts">
import CardDeck from '@/components/CardDeck.vue';
import PlayerGallery from '@/components/PlayerGallery.vue';
import type { User } from '@/model/Model';

const cards = [1, 2, 3, 5, 8, 13, 21, 34];
const players: User[] = [
  {
    name: "Fisch"
  },
  {
    name: "Bomml"
  },
  {
    name: "Nitin"
  },
  {
    name: "Fil"
  },
  {
    name: "2Peter"
  },
  {
    name: "Thommy"
  },
  {
    name: "Claus"
  },
  {
    name: "Hadde"
  },
  {
    name: "Vesselina"
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
  