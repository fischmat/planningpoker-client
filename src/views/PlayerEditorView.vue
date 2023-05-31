<script setup lang="ts">
import AvatarCard from "@/components/game/AvatarCard.vue";
import ColorSelect from "@/components/avatar/ColorSelect.vue";
import VariantSlider from "@/components/avatar/VariantSlider.vue";
import type { PlayerStub } from "@/model/Model";
import { playerService } from "@/services/PlayerService";
import { useSessionStore } from "@/stores/stores";
import { computed } from "@vue/reactivity";
import _ from "lodash";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";

const player = ref<PlayerStub>({
  name: "",
  avatar: playerService.getRandomAvatarProps()
});

const sessionStore = useSessionStore()
const router = useRouter()

const hairColors = ['aa8866', 'debe99', '241c11', '4f1a00', '9a3300'];
const skinColors = ['ffdbac', 'f1c27d', 'e0ac69', 'c68642', '8d5524'];

const isValid = computed(() => !_.isEmpty(player.value.name))
const isToched = ref(false)

function onSubmit() {
  isToched.value = true;
  if (!isValid.value) {
    return;
  }

  playerService.createOrUpdatePlayer(player.value)
    .then((player) => {
      sessionStore.currentPlayer = player
      sessionStore.persistPlayer()

      if (sessionStore.currentGame != null) {
        router.push({ name: 'game', query: { gameId: sessionStore.currentGame.id } })
      } else {
        router.push({ path: '/' })
      }
    })
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
      <h1>Setup Player</h1>

      <div class="row">
        <div class="col">
          <div>
            <div class="avatar-container">
              <AvatarCard :avatar="player.avatar!!" class="avatar" v-bind:name="player.name" />

              <div class="form-group" style="display: inline-block">
                <label>Your name:</label>
                <div class="input-group flex-nowrap">
                  <input id="player-name" type="text" class="form-control" placeholder="Username" aria-label="Username"
                    aria-describedby="addon-wrapping" v-model="player.name" />
                </div>
                <div class="invalid-feedback" :style="{ 'display': !isValid && isToched ? 'block' : 'none' }">
                  Please tell us your name!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <VariantSlider label="Eyes" :initial-value="player.avatar?.eyes" :max="26" variant-label="Eyes Variant"
            @change="$v => player.avatar!!.eyes = $v!!" />
          <VariantSlider label="Eyebrows" :initial-value="player.avatar?.eyebrows" variant-label="Eyebrow Variant"
            :max="15" @change="$v => player.avatar!!.eyebrows = $v!!" />
          <VariantSlider label="Mouth" :initial-value="player.avatar?.mouth" variant-label="Mouth Variant" :max="30"
            @change="$v => player.avatar!!.mouth = $v!!" />
          <VariantSlider label="Earrings" :initial-value="player.avatar?.earrings" variant-label="Earring Type" :max="6"
            :noneOption="true" @change="$v => player.avatar!!.earrings = $v" />
          <ColorSelect label="Hair Color" :initial-value="player.avatar?.hairColor" :colors="hairColors"
            @change="$v => player.avatar!!.hairColor = $v" />
          <VariantSlider label="Hair Length" :initial-value="player.avatar?.longHair ? 2 : 1" variant-label="Hair Length"
            :max="2" @change="$v => { player.avatar!!.longHair = ($v == 2); player.avatar!!.hair = 1; }" />
          <VariantSlider label="Hair Style" :initial-value="player.avatar?.hair" :max="19" variant-label="Hair Variant"
            :noneOption="true" @change="$v => player.avatar!!.hair = $v" />
          <VariantSlider label="Glasses" :initial-value="player.avatar?.glasses" :max="5" variant-label="Glasses"
            :noneOption="true" @change="$v => player.avatar!!.glasses = $v" />
          <ColorSelect label="Skin Color" :initial-value="player.avatar?.skinColor" :colors="skinColors"
            @change="$v => player.avatar!!.skinColor = $v" />
        </div>

      </div>
      <br>
      <div>
        <button id="submit-player" class="btn btn-primary" @click="onSubmit">Let's go</button>
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
</style>
  