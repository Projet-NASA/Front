import { defineStore } from 'pinia'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  country: string
  city: string
  dateofbirth: string
}

export const useFormStore = defineStore('form', {
  state: (): { formData: FormData } => ({
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
    setFormData(formData: Partial<FormData>) {
      this.formData = { ...this.formData, ...formData }
    }
  }
})
