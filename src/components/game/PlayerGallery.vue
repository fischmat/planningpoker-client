<script setup lang="ts">
import type { Card, Game, Player, Vote } from "@/model/Model";
import GalleryItem from "./GalleryItem.vue";
import _ from "lodash";
import { useSessionStore } from "@/stores/stores";
import { ref, toRef } from "vue";

const props = defineProps<{
  players: Player[],
  votes: Vote[],
  cardLogoUrl?: string
}>()

const players = toRef(props, 'players')
const votes = toRef(props, 'votes')

const sessionStore = useSessionStore()
const currentPlayer = sessionStore.currentPlayer

function playerCard(player: Player): Card | undefined {
  const vote = _.find(votes.value, (v) => v.player.id === player.id)
  return vote?.card
}

function playerCardHidden(player: Player): boolean {
  return player.id !== currentPlayer?.id
}
</script>

<template>
  <div class="gallery">
    <div class="row">
        <div v-for="player in players" v-bind:key="player.name" class="item col-3">
            <GalleryItem :player="player" :card="playerCard(player)" :hidden="playerCardHidden(player)" :card-logo-url="cardLogoUrl" />
        </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
    height: 100%;
}

.item {
  padding: 20px;
}

.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
