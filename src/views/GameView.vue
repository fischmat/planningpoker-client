<script setup lang="ts">
import CardDeck from '@/components/CardDeck.vue';

const cards = [1, 2, 3, 5, 8, 13, 21, 34];

</script>


<template>
  <div>
    <h1>Game</h1>
    <CardDeck :cards="cards" />
  </div>
</template>
  
<style>
</style>
  