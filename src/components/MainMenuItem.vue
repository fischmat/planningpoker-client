<script setup lang="ts">

const props = defineProps<{
  /**
   * Title of the card.
   */
  title: string,
  /**
   * Icon URL of the card. The icon must be located in /public
   */
  icon: string,
  /**
   * Background color of the card. Must be a hex-string.
   */
  color: string
}>()


</script>

<template>
  <div class="card" :style="{ backgroundColor: color }">
    <h1 class="card-title">{{ title }}</h1>
    <img class="watermark" :src="icon" alt="" />
  </div>
</template>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/functions';
@import 'node_modules/bootstrap/scss/variables';
@import 'node_modules/bootstrap/scss/mixins';

.card {
  min-height: 40vh;
}

.card:hover {
  box-shadow: 7px 7px 9px -1px rgba(0, 0, 0, 0.36);
  cursor: pointer;
}

.card h1 {
  text-transform: uppercase;
  font-weight: 300;
  margin: 20px;
  font-size: 25pt;
  color: #fff;
}

.card .watermark {
  position: absolute;
  bottom: 0;
  width: 30%;
  margin-left: 10%;
  margin-bottom: 10%;
  opacity: 0.7;
}

@include media-breakpoint-up(md) {
  .card {
    -webkit-box-shadow: 5px 5px 8px -1px rgba(0, 0, 0, 0.36);
    box-shadow: 5px 5px 8px -1px rgba(0, 0, 0, 0.36);
    height: 70%;
    max-width: 200px;
    margin: 10px;
    position: relative;
    display: inline-block;
  }

  .card .watermark {
    width: 80%;
  }
}
</style>
