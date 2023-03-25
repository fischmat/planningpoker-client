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

.settings .form-group {
  margin-bottom: 30px;
}
</style>
  