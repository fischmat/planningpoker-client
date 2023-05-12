<script setup lang="ts">
import MainMenuItem from '@/components/MainMenuItem.vue';

</script>

<template>
  <main>
    <div class="card-container">
      <RouterLink to="game-setup">
        <MainMenuItem id="start-game-card" title="Start Game" icon="/start.png" color="#00c3ac" />
      </RouterLink>

      <RouterLink to="join-game">
        <MainMenuItem id="join-game-card" title="Join Game" icon="/join.png" color="#3636fd" />
      </RouterLink>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/functions';
@import 'node_modules/bootstrap/scss/variables';
@import 'node_modules/bootstrap/scss/mixins';

main {
  height: 100vh;
}

.card-container {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}

#join-game-card {
  top: 30px;
}

@include media-breakpoint-up(md) {
  .card-container {
    padding-left: 10%;
    padding-top: 10%;
  }
}
</style>
