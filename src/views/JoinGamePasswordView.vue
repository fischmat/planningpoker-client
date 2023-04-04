<script setup lang="ts">
</script>


<template>
  <div class="game-setup">
    <div class="settings">
      <h1>Enter Password</h1>

      <div>
        <p>This game is protected by a password. Please enter it to continue.</p>

        <div class="form-group" style="display: inline-block">
          <label>Password:</label>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">🔒</span>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="addon-wrapping"
            />
          </div>
        </div>
      </div>
      <div>
        <RouterLink to="game">
          <button class="btn btn-primary">Enter</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
  
<style>
</style>
  