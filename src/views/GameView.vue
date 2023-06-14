<script setup lang="ts">
import CardDeck from '@/components/game/CardDeck.vue';
import PlayerGallery from '@/components/game/PlayerGallery.vue';
import RoundResults from '@/components/game/RoundResults.vue';
import type { Round, Card, Game, Player, AvatarProps, RoundStub, RoundResult, Vote } from '@/model/Model';
import { eventService } from '@/services/EventService';
import { gameService } from '@/services/GameService'
import { passwordService } from '@/services/PasswordService';
import { playerService } from '@/services/PlayerService';
import { useSessionStore } from '@/stores/stores';
import { computed } from '@vue/reactivity';
import _ from 'lodash';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const game = ref<Game>({ id: null, name: '', playableCards: [], hasPassword: false })
const round = ref<Round | null>(null)
const rounds = ref<Round[]>([])
const roundStub = ref<RoundStub>({ topic: '' })
const roundResult = ref<RoundResult | null>(null)
const player = ref<Player>({ id: '', name: '', gameIds: [], avatar: {} as AvatarProps })
const cards = ref<Card[]>([]);
const players = ref<Player[]>([])
const votes = ref<Vote[]>([])

const sessionStore = useSessionStore()
const router = useRouter()
const route = useRoute()

// -------------
// Methods
// -------------

async function startRound() {
  round.value = await gameService.startRound(game.value.id!!, roundStub.value)
}

async function endRound() {
  await gameService.endRound(game.value.id!!, round.value?.id!!)
  round.value = null;
}

function setPageTitle(game: Game) {
  document.title = `${game.name} - Planning Poker`
}

// -------------
// Computed
// -------------

const topic = computed(() => {
  if (round.value?.topic) {
    return round.value?.topic
  } else if (rounds.value.length > 0) {
    return `${game.value.name} - Round #${rounds.value.length}`
  } else {
    return ""
  }
})

const cardLogoUrl = computed(() => {
  if (game.value.id) {
    return gameService.getCardIconUrl(game.value.id!!)
  } else {
    return undefined
  }
})

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

  const playerOrNull = await playerService.getPlayer()
  if (!playerOrNull) {
    await router.push({ name: 'edit-player' });
    return
  }

  // Go to index if no game is active yet
  if (!sessionStore.currentGame) {
    await router.push({ path: "/" })
    return
  }
  game.value = sessionStore.currentGame
  setPageTitle(game.value)

  // Check password
  const storedPassword = passwordService.getGamePassword(game.value.id!!)
  if (game.value?.hasPassword && !storedPassword) {
    await router.push({ name: "game-password", query: { gameId: game.value.id } })
    return
  }

  // Enter the game
  player.value = await gameService.joinGame(game.value.id!!, storedPassword || null)
  await eventService.enterGame(game.value.id!!, storedPassword || null)

  // Synchronize state
  await synchronize()

  // Register for events
  eventService.onReconnect(async () => {
    await synchronize()
  });
  eventService.onPlayerJoined(async (event) => {
    if (event.gameId == game.value?.id) {
      players.value = await gameService.getPlayers(game.value?.id!!)
    }
  });
  eventService.onPlayerLeft((event) => {
    if (event.gameId == game.value?.id) {
      _.remove(players.value, (p) => p.id == event.player.id)
    }
  });
  eventService.onRoundStarted(async (event) => {
    round.value = event.round
    rounds.value = await gameService.getRounds(event.gameId)
  });
  eventService.onRoundEnded(async (event) => {
    if (event.gameId == game.value.id && event.round.id == round.value?.id) {
      round.value = null
      votes.value = []
      roundResult.value = await gameService.getRoundResults(event.gameId, event.round.id!!)
    }
  });
  eventService.onVoteSubmitted(async () => {
    if (game.value.id != null && round.value?.id != null) {
      votes.value = await gameService.getVotes(game.value.id, round.value?.id!!)
    }
  });
  eventService.onVoteRevoked(async () => {
    if (game.value.id != null && round.value?.id != null) {
      votes.value = await gameService.getVotes(game.value.id, round.value?.id!!)
    }
  });

  watch(game, (newGame) => {
    sessionStore.currentGame = newGame
    setPageTitle(newGame);
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

async function synchronize() {
  // Get game
  if (!sessionStore.currentGame) {
    await router.push({ path: "/" })
    return
  }
  const gameOrNull = await gameService.getGame(sessionStore.currentGame.id!!)
  if (!gameOrNull) {
    await router.push({ path: "/" })
    return
  }
  game.value = gameOrNull
  sessionStore.currentGame = gameOrNull

  // Get player
  const playerOrNull = await playerService.getPlayer()
  if (!playerOrNull) {
    await router.push({ name: 'edit-player' });
    return
  }
  player.value = playerOrNull
  sessionStore.currentPlayer = player.value

  // Get current round
  round.value = await gameService.getCurrentRound(game.value.id!!)
  sessionStore.currentRound = round.value

  // Get all rounds
  rounds.value = await gameService.getRounds(game.value.id!!)

  // Get votes
  if (round.value) {
    votes.value = await gameService.getVotes(game.value.id!!, round.value.id!!)
  }

  // Get cards
  cards.value = game.value?.playableCards || []

  // Get players
  players.value = await gameService.getPlayers(game.value?.id!!)
}

</script>


<template>
  <div>
    <div class="round-info">
      <h2 v-if="topic" class="topic">{{ topic }}</h2>
      <button v-if="round" class="btn btn-danger end-round-btn" @click="endRound">End round</button>
    </div>
    <div v-if="round && !round.ended" class="board">
      <PlayerGallery :game="game" :players="players" :votes="votes" :card-logo-url="cardLogoUrl" />
    </div>
    <div class="container" v-if="!round && roundResult">
      <RoundResults class="results" :results="roundResult" />
    </div>
    <div v-if="!round" class="topic-container">
      <div>
        <input class="topic-input" v-model="roundStub.topic" placeholder="Enter your topic..." type="text" />
      </div>
      <div>
        <button class="btn btn-primary start-round-btn" @click="startRound">Start Round 🚀</button>
      </div>
    </div>
    <CardDeck v-if="round" :game="game" :cards="cards" :card-logo-url="cardLogoUrl" @update="onCardPlayed" />
  </div>
</template>
  
<style>
.board {
  margin-top: 5%;
  height: 80vh;
}

.round-info {
  width: 100%;
  display: inline-block;
  width: 100%;
  text-align: center;
}

.round-info .topic {
  color: #535353;
}

.topic-container {
  position: absolute;
  width: 100%;
  margin-top: 5px;
  text-align: center;
  bottom: 0;
  padding-bottom: 20px;
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
  