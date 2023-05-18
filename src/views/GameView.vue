<script setup lang="ts">
import CardDeck from '@/components/CardDeck.vue';
import PlayerGallery from '@/components/PlayerGallery.vue';
import type { Round, Card, Game, Player, AvatarProps, RoundStub } from '@/model/Model';
import { eventService } from '@/services/EventService';
import { gameService } from '@/services/GameService'
import { playerService } from '@/services/PlayerService';
import { useSessionStore } from '@/stores/stores';
import _, { round } from 'lodash';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const game = ref<Game>({ id: null, name: '', playableCards: [], hasPassword: false })
const round = ref<Round | null>(null)
const roundStub = ref<RoundStub>({ topic: '' })
const player = ref<Player>({ id: '', name: '', gameIds: [], avatar: {} as AvatarProps })
const cards = ref<Card[]>([]);
const players = ref<Player[]>([])

const sessionStore = useSessionStore()
const router = useRouter()
const route = useRoute()

// -------------
// Methods
// -------------

async function startRound() {
  round.value = await gameService.startRound(game.value.id!!, roundStub.value)
}

// -------------
// Initalization
// -------------

async function init(): Promise<any> {
  // Set current game from URL params
  if (route.query.gameId) {
    try {
      sessionStore.currentGame = await gameService.getGame(route.query.gameId as string) as Game;
    } catch {
      await router.push({ path: "/" })
      return
    }
  }

  // Go to index if no game is active yet
  if (!sessionStore.currentGame) {
    await router.push({ path: "/" })
    return
  }
  game.value = sessionStore.currentGame
  round.value = await gameService.getCurrentRound(game.value.id!!)

  // Set player
  const playerOrNull = await playerService.getPlayer()
  if (!playerOrNull) {
    await router.push({ name: 'edit-player' });
    return
  }
  player.value = playerOrNull

  // Set state
  sessionStore.currentRound = round.value
  sessionStore.currentPlayer = player.value

  const isPlayerInGame = _.some(player.value.gameIds, (id) => id == game.value?.id);

  // Check password
  if (game.value?.hasPassword && (!isPlayerInGame || !sessionStore.password)) {
    await router.push({ name: "game-password", query: { gameId: game.value.id } })
    return
  }

  // Enter the game
  player.value = await gameService.joinGame(game.value.id!!, sessionStore.password || null)
  await eventService.enterGame(game.value.id!!, sessionStore.password || null)

  cards.value = game.value?.playableCards || []
  players.value = await gameService.getPlayers(game.value?.id!!)

  // Register for events
  eventService.onPlayerJoined((event) => {
    if (event.gameId == game.value?.id) {
      players.value.push(event.player);
    }
  });
  eventService.onPlayerLeft((event) => {
    if (event.gameId == game.value?.id) {
      _.remove(players.value, (p) => p.id == event.player.id)
    }
  });
  eventService.onRoundStarted((event) => {
    round.value = event.round
  });
  eventService.onRoundEnded((event) => {
    round.value = null
  });

  watch(game, (newGame) => {
    sessionStore.currentGame = newGame
  })
  watch(player, (newPlayer) => {
    sessionStore.currentPlayer = newPlayer
  })
  watch(round, (newRound) => {
    sessionStore.currentRound = newRound
  })
}

init().then(() => {
  console.log("Game successfully initialized!")
})
  .catch((e) => {
    console.error("Error while initilizing game.", e)
  })


// Methods

function onCardPlayed(card: Card | undefined) {
  if (!game.value || !round.value) {
    console.error("No round is currently ongoing.");
  }
  if (card) {
    gameService.submitVote(game.value?.id!!, round.value?.id!!, card)
  } else {
    gameService.revokeVote(game.value?.id!!, round.value?.id!!)
  }
}

</script>


<template>
  <div>
    <div class="title-container">
      <h1>{{ game.name }}</h1>
      <h2 v-if="round?.topic">{{ round.topic }}</h2>
    </div>
    <div class="board">
      <PlayerGallery :players="players" />
    </div>
    <div v-if="!round" class="topic-container">
      <div>
        <input class="topic-input" v-model="roundStub.topic" placeholder="Enter your topic..." type="text" />
      </div>
      <div>
        <button class="btn btn-primary start-round-btn" @click="startRound">Start Round 🚀</button>
      </div>
    </div>
    <CardDeck v-if="round" :cards="cards" @update="onCardPlayed" />
  </div>
</template>
  
<style>
.board {
  margin-top: 5%;
  height: 80vh;
}

.title-container {
  width: 100%;
  text-align: center;
}

.topic-container {
  width: 100%;
  margin-top: 5px;
  text-align: center;
}

.topic-input {
  min-width: 30%;
  line-height: 20pt;
  font-size: 20pt;
  background-color: transparent;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px;
  border-bottom-style: solid;
  border-bottom-color: #818181;
}

.start-round-btn {
  margin-top: 10px;
  min-width: 30%;
}
</style>
  