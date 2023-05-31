<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
    max: number,
    label: string,
    initialValue?: number | null,
    variantLabel?: string,
    noneOption?: boolean
}>()

const emit = defineEmits<{
  (e: "change", value: number | null): void;
}>();

const variantNum = ref(props.initialValue || 1)
const firstIndex = !props.noneOption ? 1 : 0

const variantLabel = computed(() => {
    if (variantNum.value === 0) {
        return "None";
    } else {
        return `${props.variantLabel || "Variant"} ${variantNum.value}`
    }
})

function prevVariant() {
    variantNum.value -= 1;
    if (variantNum.value < firstIndex) {
        variantNum.value = props.max;
    }
    emit("change", variantNum.value === 0 ? null : variantNum.value);
}

function nextVariant() {
    variantNum.value += 1;
    if (variantNum.value > props.max) {
        variantNum.value = firstIndex;
    }
    emit("change", variantNum.value === 0 ? null : variantNum.value);
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
                    <span>{{ variantLabel }}</span>
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

span {
    display: inline-block;
    line-height: 24pt;
    margin-top: 7px;
    padding-bottom: 6px;
    width: 100%;
    text-align: center;
}
</style>