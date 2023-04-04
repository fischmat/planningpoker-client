<script setup lang="ts">
import AvatarCard from "@/components/AvatarCard.vue";
import { ref } from "vue";

let username = ref<string>("");

</script>


<template>
  <div class="game-setup">
    <div class="settings">
      <h1>Join Game</h1>

      <div>
        <AvatarCard class="avatar" v-bind:name="username" />

        <div class="form-group" style="display: inline-block">
          <label>Your name:</label>
          <div class="input-group flex-nowrap">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              v-model="username"
            />
          </div>
        </div>
      </div>
      <div>
        <RouterLink to="game-password">
          <button class="btn btn-primary">Let's go</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
  
<style>
.settings .avatar {
  margin-bottom: 10px;
}

.avatar {
  display: inline-block;
  margin-right: 20px;
}
</style>
  