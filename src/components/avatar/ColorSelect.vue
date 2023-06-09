<script setup lang="ts">
import _ from 'lodash';
import { computed, ref, toRef, watch } from 'vue';

const props = defineProps<{
    colors: string[],
    label: string,
    initialValue?: string
}>()

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

const initialValue = toRef(props, 'initialValue')
const variantIndex = ref(props.initialValue ? _.indexOf(props.colors, props.initialValue) : 0)
const color = computed(() => props.colors[variantIndex.value % props.colors.length])

watch(initialValue, (newValue) => {
    variantIndex.value = _.indexOf(props.colors, newValue)
})

function prevVariant() {
    variantIndex.value -= 1;
    if (variantIndex.value < 0) {
        variantIndex.value = props.colors.length;
    }
    emit("change", color.value);
}

function nextVariant() {
    variantIndex.value += 1;
    if (variantIndex.value >= props.colors.length) {
        variantIndex.value = 0;
    }
    emit("change", color.value);
}

</script>

<template>
    <div>
        <div>
            <label>{{ label }}</label>

            <div class="row">
                <div class="col-2">
                    <button class="btn" @click="prevVariant()">&lt;</button>
                </div>
                <div class="col-8">
                    <div class="color-preview" :style="{ backgroundColor: `#${color}` }"></div>
                </div>
                <div class="col-2">
                    <button class="btn" @click="nextVariant()">&gt;</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn {
    border-color: #aaa;
}
.btn:active {
    background-color: #aaa;
}

.color-preview {
    margin-top: 6px;
    min-height: 24pt;
    min-width: 24pt;
}
</style>