<script setup lang="ts">
import type { Card, RoundResult, Vote } from '@/model/Model';
import { useSessionStore } from '@/stores/stores';
import { Chart, type ChartConfiguration, type ChartItem, registerables } from 'chart.js';
import _ from 'lodash';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    results: RoundResult
}>()

function generateChartConfig(votes: Vote[], playableCards: Card[]): ChartConfiguration {
    var delayed = false;
    const voteCounts = _.countBy(votes, (v) => v.card.value);
    return {
        type: 'bar',
        data: {
            labels: playableCards.map((c) => `Card ${c.value}`),
            datasets: [
                {
                    label: 'Votes',
                    data: playableCards.map((c) => voteCounts[_.toString(c.value)] || 0),
                    minBarLength: 5
                }
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context: any) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "# Votes per card"
                },
                legend: {
                    display: false
                }
            }
        }
    };
}

onMounted(() => {
    Chart.register(...registerables);
    const sessionStore = useSessionStore();
    if (!sessionStore.currentGame) {
        throw Error("No game is active.")
    }
    new Chart(document.getElementById('votes') as ChartItem, generateChartConfig(props.results.votes, sessionStore.currentGame.playableCards))
})
</script>

<template>
    <div>
        <canvas id="votes"></canvas>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
