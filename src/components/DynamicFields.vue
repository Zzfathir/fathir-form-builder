<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import { type FieldType } from '@/types/formType'
// @ts-ignore
import { useFormStore } from '@/store/formStore'

const props = defineProps<{
  fields: FieldType[]
}>()

const { fields } = toRefs(props)
const formStore = useFormStore()

const emit = defineEmits(['update:value', 'validation'])

//function validation field
const validationHandler = () => {
  return fields.value.every((field) => {
    if (field.required && !formStore.formData[field.label]) {
      return false
    }
    return true
  })
}

// meng update value setiap ada perubahan & memeriksa validasi
watch(
  formStore.formData,
  (newValue) => {
    emit('update:value', newValue)
    emit('validation', validationHandler())
  },
  { deep: true },
)
</script>

<template>
  <div class="mt-10">
    <div v-for="field in fields" :key="field.label" class="mb-4">
      <label class="block font-semibold mb-2">{{ field.label }}</label>

      <!-- text field -->
      <div v-if="field.type === 'textfield'">
        <input
          type="text"
          :placeholder="field.placeholder"
          v-model="formStore.formData[field.label]"
          class="rounded-md border border-slate-500 p-2 w-full"
        />
      </div>

      <!-- radio field -->
      <div v-if="field.type === 'radio'" class="flex gap-4">
        <div
          v-for="option in field.options"
          :key="typeof option === 'object' ? option.value : option"
          class="flex items-center"
        >
          <input
            type="radio"
            :value="typeof option === 'object' ? option.value : option"
            v-model="formStore.formData[field.label]"
            class="peer mr-1 appearance-none shrink-0 mt-1 w-4 h-4 border-[2px] border-[#e38262] rounded-full checked:bg-[#e38262] transition-all duration-100"
          />
          <label
            class="text-gray-700 peer-checked:text-black transition-all duration-100 capitalize"
            >{{ typeof option === 'object' ? option.value : option }}</label
          >
        </div>
      </div>

      <!-- textarea -->
      <div v-if="field.type === 'textarea'">
        <textarea
          :placeholder="field.placeholder"
          v-model="formStore.formData[field.label]"
          rows="4"
          class="rounded-md border border-slate-500 p-2 w-full"
        ></textarea>
      </div>

      <!--  -->
      <div v-if="field.type === 'autocomplete'">
        <input
          type="text"
          list="autoComplete"
          :placeholder="field.placeholder"
          v-model="formStore.formData[field.label]"
          class="rounded-md border border-slate-500 p-2 w-full"
        />
        <datalist id="autoComplete">
          <option
            v-for="option in field.options"
            :key="typeof option === 'object' ? option.value : option"
          >
            {{ option }}
          </option>
        </datalist>
      </div>
    </div>
  </div>
</template>
