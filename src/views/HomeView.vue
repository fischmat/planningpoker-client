<script setup lang="ts">
</script>

<template>
  <main>
    <div class="card-container">
      <RouterLink to="game-setup">
        <div class="card" style="background-color: #00c3ac">
          <h1 class="card-title">Start Game</h1>
          <img class="bg-img" src="@/assets/start.png" alt="" />
        </div>
      </RouterLink>

      <RouterLink to="join-game">
        <div class="card" style="background-color: #3636fd; top: 30px">
          <h1 class="card-title">Join Game</h1>
          <img class="bg-img" src="@/assets/join.png" alt="" />
        </div>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
}

.card-container {
  width: 100%;
  height: 100%;
  padding-left: 10%;
  padding-top: 10%;
}

.card {
  -webkit-box-shadow: 5px 5px 8px -1px rgba(0, 0, 0, 0.36);
  box-shadow: 5px 5px 8px -1px rgba(0, 0, 0, 0.36);
  height: 70%;
  max-width: 200px;
  margin: 10px;
  position: relative;
  display: inline-block;
}

.card:hover {
  box-shadow: 7px 7px 9px -1px rgba(0, 0, 0, 0.36);
  cursor: pointer;
}

.card h1 {
  text-transform: uppercase;
  font-weight: 300;
  margin: 20px;
  font-size: 25pt;
  color: #fff;
}

.card .bg-img {
  position: absolute;
  bottom: 0;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 10%;
  opacity: 0.7;
}
</style>
