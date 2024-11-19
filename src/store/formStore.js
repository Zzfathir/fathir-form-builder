import { defineStore } from 'pinia'

export const useFormStore = defineStore('formStore', {
  state: () => ({
    formData: {},
  }),
  actions: {
    updateFormData(payload) {
      this.formData = payload
    },
  },
})
