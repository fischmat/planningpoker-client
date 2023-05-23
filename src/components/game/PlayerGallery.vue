<script setup lang="ts">
import type { Player } from "@/model/Model";
import GalleryItem from "./GalleryItem.vue";

const props = defineProps<{
  players: Player[]
}>()

</script>

<template>
  <div class="gallery">
    <div class="row">
        <div v-for="player in players" v-bind:key="player.name" class="col-4">
            <GalleryItem :player="player" :hidden="true" />
        </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
    height: 100%;
}
</style>
