import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => ({
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      country: '',
      city: '',
      dateofbirth: ''
    }
  }),
  actions: {
    setFormData(formData) {
      this.formData = { ...this.formData, ...formData }
    }
  }
})
