<script setup lang="ts">
import type { Player } from "@/model/Model";

const props = defineProps<{
  players: Player[]
}>()

</script>

<template>
  <div class="gallery">
    <div class="row">
        <div v-for="user in players" v-bind:key="user.name" class="col-4">
            <Player :user="user" />
        </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
    height: 100%;
}
</style>
