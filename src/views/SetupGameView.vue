<template>
  <div class="game-setup">
    <div class="settings">
      <h1>Setup Game</h1>

      <div class="form-group">
        <label>Session name:</label>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">♣</span>
          <input
            type="text"
            class="form-control"
            placeholder="Session name"
            aria-label="Session name"
            aria-describedby="addon-wrapping"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Password (optional):</label>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">🔒</span>
          <input
            type="text"
            class="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="addon-wrapping"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Cards:</label>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">🔢</span>
          <input
            type="text"
            class="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="addon-wrapping"
            value="1, 3, 5, 8, 13, 21"
          />
        </div>
      </div>

      <div>
        <RouterLink to="join-game">
            <button class="btn btn-primary">Start</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
  
<style>
</style>
  