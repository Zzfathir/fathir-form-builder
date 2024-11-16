<script setup lang="ts">
import MultiStepForm from './components/MultiStepForm.vue'
import structure from './data/structure.json'
</script>

<template>
  <div class="bg-[url('./assets/images/bg-images.jpg')] w-full min-h-screen bg-cover ">
    <h1 class="text-2xl text-center font-bold pt-20">Fathir Form Builder</h1>
    <div class="flex items-center justify-center">
      <MultiStepForm :formStructure="structure" />
    </div>
  </div>
</template>
