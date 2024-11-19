<script lang="ts" setup>
import type { FormType } from '@/types/formType'
import { ref } from 'vue'
import DynamicFields from './DynamicFields.vue'
// @ts-ignore
import { useFormStore } from '@/store/formStore'
import Card from './Card.vue'

const props = defineProps<{
  formStructure: FormType
}>()

const formStore = useFormStore()
const curStep = ref<number>(1)
const showCard = ref<boolean>(false)
const isStepValid = ref<boolean>(false)

const validationHandler = (isValid: boolean) => {
  isStepValid.value = isValid
}

//function next step
const nextStep = () => {
  if (isStepValid.value && curStep.value < props.formStructure.length) {
    curStep.value++
  }
}

// function previous step
const previousStep = () => {
  if (curStep.value > 1) {
    curStep.value--
  }
}

//function handle submit
const handleSubmit = () => {
  // saat disubmit ketika valid makan tampilkan card
  if (isStepValid.value) {
    showCard.value = true
  }
}

// function handle click step button
const handleStepButton = (step: number) => {
  // Jika stepnya valid makan bisa meng klik button step berikutnya
  if (isStepValid.value) {
    curStep.value = step
  }
}
</script>

<template>
  <div class="md:flex md:space-x-2 space-y-2 md:space-y-0 my-10">
    <div class="bg-white px-12 py-10 shadow-lg flex">
      <form @submit.prevent="handleSubmit">
        <div class="flex items-center justify-center mb-10">
          <div v-for="(item, index) in props.formStructure" :key="index" class="flex items-center">
            <div v-if="index === 0" class="w-16 md:w-28 h-[2px] bg-[#e38262]"></div>
            <button
              type="button"
              @click="handleStepButton(item.step)"
              :class="{
                'rounded-full w-14 h-14 text-xl font-bold text-center flex items-center justify-center  cursor-pointer': true,
                'bg-[#e38262] text-white': curStep >= item.step,
                'bg-gray-200': curStep < item.step,
              }"
            >
              <span>{{ item.step }}</span>
            </button>
            <div
              v-if="index !== props.formStructure.length - 1"
              :class="{
                'w-24 md:w-36 h-[2px]': true,
                'bg-[#e38262]': curStep >= item.step,
                'bg-gray-300': curStep < item.step,
              }"
            ></div>
            <div
              v-if="index === props.formStructure.length - 1"
              :class="{
                'w-16 md:w-28 h-[2px]': true,
                'bg-[#e38262]': curStep >= item.step,
                'bg-gray-300': curStep < item.step,
              }"
            ></div>
          </div>
        </div>

        <h1 class="font-semibold text-xl text-end">
          {{ props.formStructure[curStep - 1].title }}
        </h1>
        <p class="text-end text-sm text-gray-700">
          {{ props.formStructure[curStep - 1].description }}
        </p>

        <DynamicFields
          :key="curStep"
          :fields="props.formStructure[curStep - 1].fields"
          :value="formStore.formData"
          @update:value="(newData: string) => formStore.updateFormData(newData)"
          @validation="validationHandler"
        />

        <div class="flex justify-between mt-8">
          <button type="button" @click="previousStep" :disabled="curStep === 1">
            <i class="fa-solid fa-arrow-left hover:-translate-x-1 transition-all duration-100"></i>
          </button>
          <button
            v-if="curStep !== props.formStructure.length"
            type="button"
            @click="nextStep"
            :disabled="!isStepValid"
            :class="{
              'opacity-50 cursor-not-allowed': !isStepValid,
            }"
          >
            <i class="fa-solid fa-arrow-right hover:translate-x-1 transition-all duration-100"></i>
          </button>
          <button
            v-if="curStep === formStructure.length"
            type="submit"
            :disabled="!isStepValid"
            class="text-[#e38262] hover:text-[#b3664d] transition-all duration-100 px-4 py-2"
            :class="{
              'opacity-50 cursor-not-allowed': !isStepValid,
            }"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    <Card v-if="showCard" @close="showCard = false" />
  </div>
</template>
