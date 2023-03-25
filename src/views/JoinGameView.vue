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
.settings {
  margin-left: 10%;
  margin-top: 10%;
  max-width: 50%;
  padding: 20px;
  border-left: 3px solid #aaa;
}

.settings h1 {
  text-transform: uppercase;
  font-weight: 300;
  color: #aaa;
  margin-bottom: 30px;
}

.settings label {
  text-transform: uppercase;
  color: #aaa;
}

.settings .btn-primary {
  background-color: #00c3ac;
  border-color: #00c3ac;
  width: 100px;
  float: right;
  text-transform: uppercase;
}

.settings .avatar {
  margin-bottom: 10px;
}

.settings .form-group {
  margin-bottom: 30px;
}

.avatar {
  display: inline-block;
  margin-right: 20px;
}
</style>
  