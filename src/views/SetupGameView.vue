<script setup lang="ts">
import { eventService } from '@/services/EventService';
import { gameService } from '@/services/GameService';
import type { Card } from '@/model/Model';
import _ from 'lodash';
import { computed, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/stores/stores';
import { playerService } from '@/services/PlayerService';


const router = useRouter()
const sessionStore = useSessionStore()

var name = ref('')
var password: Ref<string | null> = ref(null)
var playableCards: Ref<Card[] | []> = ref([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 5 }, { value: 8 }, { value: 13 }, { value: 21 }])

const cardsString = computed(() => {
  return _.join(playableCards.value.map((c) => c.value), ', ')
})
const isValid = computed(() => {
  return !_.isEmpty(name.value) && !_.isEmpty(playableCards.value)
})

function onCardStringChanged(e: any) {
  const splits = _.split(e.target.value, ",")
    .map((s) => _.trim(s))
    .filter((s) => !_.isEmpty(s))

  // Return empty if any split is not a number
  if (_.isEmpty(splits) || _.some(splits, (s) => s != '0' && _.toInteger(s) === 0)) {
    playableCards.value = []
  }

  const cards = splits.map((s) => {
    return { value: _.toNumber(s) } as Card;
  });
  playableCards.value = _.sortBy(_.uniq(cards), (c) => c.value);
}

async function onSubmit(e: any) {
  const game = await gameService.createGame({
    name: name.value,
    password: password.value,
    playableCards: playableCards.value
  });
  console.log(`Created new game ${game.id}.`);
  eventService.enterGame(game.id!!, password.value);

  sessionStore.currentGame = game;
  sessionStore.password = password.value;
  if (await playerService.getPlayer()) {
    router.push({ name: 'game', query: { gameId: game.id } });
  } else {
    router.push({ name: 'edit-player' });
  }
}

</script>
<template>
  <div class="game-setup">
    <div class="settings">
      <h1>Setup Game</h1>

      <div class="form-group">
        <label>Session name:</label>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">♣</span>
          <input id="session-name" type="text" v-model="name" class="form-control" placeholder="Session name"
            aria-label="Session name" aria-describedby="addon-wrapping" />
        </div>
      </div>

      <div class="form-group">
        <label>Password (optional):</label>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">🔒</span>
          <input id="session-password" type="text" v-model="password" class="form-control" placeholder="Password"
            aria-label="Password" aria-describedby="addon-wrapping" />
        </div>
      </div>

      <div class="form-group">
        <label>Cards:</label>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">🔢</span>
          <input id="session-cards" type="text" class="form-control" placeholder="Cards" aria-label="Cards"
            aria-describedby="addon-wrapping" :value="cardsString" @change="onCardStringChanged($event)" />
        </div>
      </div>

      <div>
        <button id="session-submit" :disabled="!isValid" class="btn btn-primary" @click="onSubmit">Start</button>
      </div>
    </div>
  </div>
</template>
  
<style></style>
  