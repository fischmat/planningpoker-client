<script setup lang="ts">
import type { User } from "@/model/Model";
import Player from "@/components/Player.vue";

const props = defineProps<{
  players: User[]
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
