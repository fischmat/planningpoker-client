<script setup lang="ts">
import { computed, defineComponent } from "vue";
import _ from "lodash";

const props = defineProps<{
  value: number;
  hidden: boolean;
  logo?: string;
}>();

const emit = defineEmits(['click']);

function cardIcon(card: number) {
  const icons = ["♣", "♠", "♥", "♦"];
  return icons[this.props.value % icons.length];
}

const logoUrl = computed(() => {
  return props.logo ||
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAM1BMVEVHcEwxNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz0xNz3UIFXbAAAAEXRSTlMAcBCf/88w71BggN+/QK8gj+DykpQAAAFqSURBVHgBzdcH0qswDARgIS24E+5/2dcLHg2O2b/lm5Zpm6ISJBOWRd6DGmAqb6YrAKxvTtoCfgmbvEkM+CNEeYOEkyS0jE4WkqEHY3McY3McY3McY3McY3Mc43P4JMOQ8TlcUsJTSSZETIjze2NoYqtowZSiMlYxqcpQxrQsAw03NLmkATcElSs7btnZDnIiX/mpHsjwmMo9QHiIZyAY+4EmPpKBYlwvTnRlAinxTT1ub9Ck00BrfFePuvsA7ZCzClp98aAdtP1jqhZBi3KmoOkHzVp7y4R0Kl/83gbKJk56+1obDe7qXviBdRY4tuCPxeAscqEVdEKS/X+ZU0CnNLmWTlHB9PTnElTUwikmyVg7agCwWtK+AklENNkKINSjyS1a/KMH5XBjzmnoNP7mHz+lszlsUgtwQnvjzc//4qngQkkyTfsYH6XPI1qLueKpmmNro5yKG6ryN9bspYWb3i3o8eFf7S0/9nfEdTEqQju3eQAAAABJRU5ErkJggg==";
});
</script>

<template>
  <div class="card" :class="{ hidden: hidden }" @click="emit('click')">
    <div v-if="!hidden">
      <span class="corner top-left">{{ value }}</span>
      <span class="corner top-right">{{ cardIcon(value) }}</span>
      <span class="title">{{ value }}</span>
      <span class="corner bottom-left">{{ cardIcon(value) }}</span>
      <span class="corner bottom-right">{{ value }}</span>
    </div>
    <div v-else>
      <img
        class="logo"
        :src="logoUrl"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100px;
  height: 150px;
  margin-right: 10px;
  margin-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

.hidden {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23F3F3F3' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E");
}

.hidden .logo {
  width: 50px;
  filter: grayscale(10%);
}

.title {
  font-size: 30pt;
  vertical-align: middle;
  display: inline-block;
  line-height: normal;
}

.corner {
  font-size: 15pt;
  font-weight: 200;
  position: absolute;
}

.corner.top-left {
  top: 0;
  left: 0;
  margin-left: 10px;
  margin-top: 7px;
}

.corner.top-right {
  top: 0;
  right: 0;
  margin-right: 10px;
  margin-top: 7px;
}

.corner.bottom-left {
  bottom: 0;
  left: 0;
  margin-left: 10px;
  margin-bottom: 7px;
}

.corner.bottom-right {
  bottom: 0;
  right: 0;
  margin-right: 10px;
  margin-bottom: 7px;
}
</style>
