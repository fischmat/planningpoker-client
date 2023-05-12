<script setup lang="ts">
import type { User } from "@/model/Model";
import { computed } from "vue"

const props = defineProps<{
  user: User
}>()

const avatarUrl = computed(() => `https://api.dicebear.com/5.x/adventurer/svg?seed=${props.user.name}`)
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
