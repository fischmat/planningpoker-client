<script setup lang="ts">
import { computed, defineComponent } from "vue"

const props = defineProps<{
  name: string
}>()

const avatarUrl = computed(() => `https://api.dicebear.com/5.x/adventurer/svg?seed=${props.name}`)
</script>

<template>
  <div class="avatar">
    <img :src="avatarUrl" alt="" />
  </div>
</template>

<style scoped>
.avatar {
  width: 100px;
  border: 1px solid #aaa;
  border-radius: 50px;
  padding: 10px;
}
</style>
