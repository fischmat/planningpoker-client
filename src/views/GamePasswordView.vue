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
        <button class="btn btn-primary">Enter</button>
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

.settings p {
  color: #777;
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
  