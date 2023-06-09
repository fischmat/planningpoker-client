<script setup lang="ts">
import AvatarCard from "@/components/game/AvatarCard.vue";
import ColorSelect from "@/components/avatar/ColorSelect.vue";
import VariantSlider from "@/components/avatar/VariantSlider.vue";
import type { PlayerStub } from "@/model/Model";
import { playerService } from "@/services/PlayerService";
import { useSessionStore } from "@/stores/stores";
import { computed } from "@vue/reactivity";
import _ from "lodash";
import { onMounted, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

const player = ref<PlayerStub>({
  name: "",
  avatar: playerService.getRandomAvatarProps()
});

const sessionStore = useSessionStore()
const router = useRouter()

const hairColors = playerService.hairColors;
const skinColors = playerService.skinColors;

const isValid = computed(() => !_.isEmpty(player.value.name))

// -------------
// Mounted
// -------------

const playerNameInput = ref<any>(null)
onMounted(() => {
  playerNameInput.value.focus()
})

// -------------
// Methods
// -------------

function onSubmit() {
  if (!isValid.value) {
    return;
  }

  playerService.createOrUpdatePlayer(player.value)
    .then((player) => {
      sessionStore.currentPlayer = player
      sessionStore.persistPlayer()

      if (sessionStore.currentGame != null) {
        router.push({ name: 'game', query: { gameId: sessionStore.currentGame.id, ref: 'edit-player' } })
      } else {
        router.push({ path: '/' })
      }
    })
}

function randomizeAvatar() {
  player.value.avatar = playerService.getRandomAvatarProps()
}

// Initialization

async function init() {
  const me = await playerService.getPlayer()
  if (me) {
    sessionStore.currentPlayer = me
    player.value = me
  }
}

init()
  .then(() => console.log("Player initialized!"))
  .catch((e) => console.error("Failed to initialize player.", e))

</script>


<template>
  <div class="game-setup">
    <div class="settings">
      <h1>Create Avatar</h1>

      <div class="row">
        <div class="col">
          <div>
            <div class="avatar-container">
              <AvatarCard :avatar="player.avatar!!" class="avatar" v-bind:name="player.name" />

              <div class="form-group" style="display: inline-block">
                <label>Your name:</label>
                <div class="input-group flex-nowrap">
                  <input id="player-name" ref="playerNameInput" type="text" class="form-control" placeholder="Username"
                    aria-label="Username" aria-describedby="addon-wrapping" v-model="player.name" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <span class="prop-heading">Face</span>
          <VariantSlider class="avatar-input" label="Eyes" :initial-value="player.avatar?.eyes" :max="26" variant-label="Eyes Variant"
            @change="$v => player.avatar!!.eyes = $v!!" />
          <VariantSlider class="avatar-input" label="Eyebrows" :initial-value="player.avatar?.eyebrows" variant-label="Eyebrow Variant"
            :max="15" @change="$v => player.avatar!!.eyebrows = $v!!" />
          <VariantSlider class="avatar-input" label="Mouth" :initial-value="player.avatar?.mouth" variant-label="Mouth Variant" :max="30"
            @change="$v => player.avatar!!.mouth = $v!!" />
          <hr>
          <span class="prop-heading">Hair</span>
          <ColorSelect class="avatar-input" label="Hair Color" :initial-value="player.avatar?.hairColor" :colors="hairColors"
            @change="$v => player.avatar!!.hairColor = $v" />
          <VariantSlider class="avatar-input" label="Hair Length" :initial-value="player.avatar?.longHair ? 2 : 1" variant-label="Hair Length"
            :max="2" @change="$v => { player.avatar!!.longHair = ($v == 2); player.avatar!!.hair = 1; }" />
          <VariantSlider class="avatar-input" label="Hair Style" :initial-value="player.avatar?.hair" :max="19" variant-label="Hair Variant"
            :noneOption="true" @change="$v => player.avatar!!.hair = $v" />
          <hr>
          <span class="prop-heading">Accessories</span>
          <VariantSlider class="avatar-input" label="Earrings" :initial-value="player.avatar?.earrings" variant-label="Earring Type" :max="6"
            :noneOption="true" @change="$v => player.avatar!!.earrings = $v" />
          <VariantSlider class="avatar-input" label="Glasses" :initial-value="player.avatar?.glasses" :max="5" variant-label="Glasses"
            :noneOption="true" @change="$v => player.avatar!!.glasses = $v" />
          <hr>
          <span class="prop-heading">Skin</span>
          <ColorSelect class="avatar-input" label="Skin Color" :initial-value="player.avatar?.skinColor" :colors="skinColors"
            @change="$v => player.avatar!!.skinColor = $v" />
        </div>

      </div>
      <br>
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <button id="randomize-player" class="btn btn-secondary" @click="randomizeAvatar">Randomize</button>
          <button id="submit-player" :disabled="!isValid" class="btn btn-primary" @click="onSubmit">Let's go</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style>
.settings .avatar {
  margin-bottom: 10px;
}

.avatar {
  display: inline-block;
  margin-right: 20px;
}

.avatar-container {
  width: 100%;
  padding-left: 20%;
  padding-right: 20%;
}

.form-group {
  width: 100%;
}

.game-setup {
  margin-top: 0;
}

.btn-secondary,
.btn-secondary:focus {
  background-color: unset;
  color: #333;
}

.avatar-input {
  margin-top: 5px;;
}

.prop-heading {
  display: inline-block;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 2pt;
  color: #808080;
}
</style>
  