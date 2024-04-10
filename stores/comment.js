import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => ({
    formData: {
        postId: ''
    }
  }),
  actions: {
    setFormData(formData) {
      this.formData = { ...this.formData, ...formData }
    }
  }
})
