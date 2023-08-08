<script setup lang="ts">
import type { RoundResult, Vote } from '@/model/Model';
import PokerCard from '../PokerCard.vue';
import GalleryItem from '../GalleryItem.vue';
import _ from 'lodash';
import { computed } from '@vue/reactivity';
import Rainbow from 'rainbowvis.js'
import ResultCharts from './ResultCharts.vue';

const props = defineProps<{
  results: RoundResult
}>()

const average = computed(() => props.results.averageVote?.toFixed(2) || 'N/A')
const variance = computed(() => props.results.variance?.toFixed(2) || 'N/A')
const sortedVotes = computed(() => _.sortBy(props.results.votes, (v) => v.card.value))
const median = computed(() => {
  const sortedValues = sortedVotes.value.map((v) => v.card.value)
  const halfIdx = _.floor(sortedValues.length / 2)
  if (sortedValues.length % 2 == 0) {
    return _.mean([sortedValues[halfIdx - 1], sortedValues[halfIdx]])
  } else {
    return sortedValues[halfIdx]
  }
})

// Variance
const varianceRainbow = new Rainbow()
varianceRainbow.setSpectrum('#008450', '#EFB700', '#B81D13')
varianceRainbow.setNumberRange(0, props.results.averageVote || 100)
const varianceColor = computed(() => {
  if (typeof props.results.variance == 'number') {
    return `#${varianceRainbow.colorAt(props.results.variance)}`
  } else {
    return '#000000'
  }
})

// Methods
function isMinimumVote(vote: Vote): boolean {
  return _.some(props.results.minVotes, (mv) => mv.id == vote.id)
}
function isMaximumVote(vote: Vote): boolean {
  return _.some(props.results.maxVotes, (mv) => mv.id == vote.id)
}

</script>

<template>
  <div>
    <div v-if="results.suggestedCard">
      <div class="results">
        <PokerCard id="suggested-card" class="centered" :card="results.suggestedCard" :hidden="false" />
        <div class="centered sub">
          <span>Suggested card</span>
        </div>

        <div class="row">
          <div class="col">
            <div class="centered sub">
              <span id="average" class="metric">{{ average }}</span>
              <span>Average</span>
            </div>
          </div>
          <div class="col">
            <div class="centered sub">
              <span id="median" class="metric">{{ median }}</span>
              <span>Median</span>
            </div>
          </div>
          <div class="col">
            <div class="centered sub">
              <span id="variance" class="metric" v-bind:style="{ color: varianceColor }">{{ variance }}</span>
              <span>Variance</span>
            </div>
          </div>
        </div>

        <ResultCharts :results="results"/>

        <div class="centered">
          <h2>Votes</h2>
        </div>
        <br>
        <div id="votes" class="row">
          <div class="col-3" v-for="vote in sortedVotes">
            <GalleryItem :player="vote.player" :card="vote.card" :hidden="false"
              :min-badge="isMinimumVote(vote) && !isMaximumVote(vote)"
              :max-badge="isMaximumVote(vote) && !isMinimumVote(vote)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results {
  padding-top: 30px;
}

.centered {
  margin: 0 auto;
  text-align: center;
}

.sub {
  padding: 20px;
  font-weight: 600;
}

.metric {
  display: block;
  font-size: 30pt;
}
</style>
