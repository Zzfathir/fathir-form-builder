<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{
  formData: Record<string, any> | null
}>()

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
}
</script>

<template>
  <div v-if="formData" class="bg-white p-4 shadow-lg h-fit min-w-96">
    <h2 class="text-center text-lg font-semibold">Preview</h2>
    <hr class="my-3" />
    <div class="">
      <div v-for="(value, key) in formData.value" :key="key" class="mb-2 text-center">
        <strong class="block">{{ key }}</strong>
        <p>{{ value }}</p>
      </div>
    </div>
    <button @click="onClose" class="text-red-500 px-4 py-2 rounded mt-4">Close</button>
  </div>
</template>
