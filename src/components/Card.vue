<script lang="ts" setup>
import { defineEmits } from 'vue'
// @ts-ignore
import { useFormStore } from '@/store/formStore'

const emit = defineEmits(['close'])
const formStore = useFormStore()
const onClose = () => {
  emit('close')
}
</script>

<template>
  <div v-if="formStore.formData" class="bg-white p-4 shadow-lg h-fit min-w-96">
    <h2 class="text-center text-lg font-semibold">Preview</h2>
    <hr class="my-3" />
    <div class="">
      <div v-for="(value, key) in formStore.formData" :key="key" class="mb-2 text-center">
        <strong class="block">{{ key }}</strong>
        <p>{{ value }}</p>
      </div>
    </div>
    <button @click="onClose" class="text-red-500 px-4 py-2 rounded mt-4">Close</button>
  </div>
</template>
