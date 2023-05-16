<script setup lang="ts">
import type { AvatarProps, PlayerStub } from "@/model/Model";
import { playerService } from "@/services/PlayerService";
import { computed } from "vue"

const props = defineProps<{
  avatar: AvatarProps
}>()

const avatarUrl = computed(() => playerService.getAvatarPreview(props.avatar))
</script>

<template>
  <div class="avatar">
    <img :src="avatarUrl" alt="" />
  </div>
</template>

<style scoped>
.avatar {
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 50px;
  padding: 10px;
}
</style>
