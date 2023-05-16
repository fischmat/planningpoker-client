<script setup lang="ts">
import AvatarCard from '@/components/AvatarCard.vue';
import type { Player } from '@/model/Model';

const user: Player = {
    id: null,
    name: "",
    gameIds: []
}

</script>

<template>
  <main>
    <AvatarCard  :user="user" />
  </main>
</template>

<style lang="scss" scoped>
@import 'node_modules/bootstrap/scss/functions';
@import 'node_modules/bootstrap/scss/variables';
@import 'node_modules/bootstrap/scss/mixins';

</style>
