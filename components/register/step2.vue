<template>
  <section
    class="bg-background-default min-h-screen flex justify-center items-center w-full"
  >
    <div class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 my-8">
      <form
        @submit.prevent="submitForm"
        class="bg-background-200 shadow-md rounded px-8 pt-6 pb-8 mb-2"
              >
                <button @click="previousStep">
                  <Icon name="octicon:arrow-left-24" class="text-text-default" />
                </button>
                <div class="flex justify-center items-center">
                  <img src="/assets/images/logo-transparent.png" class="w-28 h-28" />
                </div>

                <h1 class="text-2xl font-bold mb-5 text-center text-text-default">
                  Add a user
                </h1>
                <div class="mb-4">
                  <label
                    for="country"
                    class="block text-text-default text-sm font-bold mb-2"
                    >Country</label
                  >
                  <div class="relative">
                    <input
                      id="country"
                      name="country"
                      v-model="formData.country"
                      type="text"
                      @change="v$.country.$touch"
                      class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      :class="{
                        'border-red-500 focus:border-red-500': v$.country.$error,
                        'border-[#42d392] ': !v$.country.$invalid
                      }"
                    />
                    <Icon
                      v-if="!v$.country.$invalid || v$.country.$error"
                      class="absolute right-2 h-full text-xl text-green-500"
                      :class="{
                        'text-green-500': !v$.country.$invalid,
                        'text-yellow-500': v$.country.$error
                      }"
                      :name="`heroicons-solid:${!v$.country.$error ? 'check-circle' : 'exclamation'}`"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    for="city"
                    class="block text-text-default text-sm font-bold mb-2"
                    >City</label
                  >
                  <div class="relative">
                    <input
                      id="city"
                      name="city"
                      v-model="formData.city"
                      type="text"
                      @change="v$.city.$touch"
                      class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      :class="{
                        'border-red-500 focus:border-red-500 align-middle':
                          v$.city.$error,
                        'border-[#42d392] ': !v$.city.$invalid
                      }"
                    />
                    <Icon
                      v-if="!v$.city.$invalid || v$.city.$error"
                      class="absolute right-2 h-full text-xl text-green-500"
                      :class="{
                        'text-green-500': !v$.city.$invalid,
                        'text-yellow-500': v$.city.$error
                      }"
                      :name="`heroicons-solid:${!v$.city.$error ? 'check-circle' : 'exclamation'}`"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    for="city"
                    class="block text-text-default text-sm font-bold mb-2"
                    >Date of Birth</label
                  >
                  <VDatePicker v-model="formData.dateofbirth" :popover="false">
                    <template #default="{ togglePopover, inputValue, inputEvents }">
                      <div class="flex items-center">
                        <button
                          id="calendar"
                          type="button"
                          class="shadow appearance-none border border-primary-800 rounded w-12 py-2 pb-3 px-2 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          @click.stop="togglePopover()"
                        >
                          <Icon name="octicon:calendar" />
                        </button>

                        <div class="relative">
                          <input
                            id="date"
                            name="date"
                            :value="inputValue"
                            v-on="inputEvents"
                            @change="v$.date.$touch"
                            class="mb-3 shadow appearance-none border border-primary-800 my-auto rounded w-full py-2 px-3 text-gray-70 leading-tight focus:outline-none focus:shadow-outline"
                            :class="{
                              'border-red-500 focus:border-red-500 align-middle':
                                v$.date.$error
                            }"
                          />
                          <Icon
                            v-if="v$.date.$error"
                            class="absolute right-2 h-full text-xl text-green-500"
                            :class="{
                              'text-yellow-500': v$.date.$error
                            }"
                            :name="`heroicons-solid:${!v$.date.$error ? 'check-circle' : 'exclamation'}`"
                          />
                        </div>
                      </div>
                    </template>
                  </VDatePicker>
                </div>
                <div class="mb-6">
                  <label
                    for="phone"
                    class="block text-text-default text-sm font-bold mb-2"
                    >Phone Number</label
                  >
                  <div class="relative">
                    <input
                      id="phone"
                      name="phone"
                      v-model="formData.phone"
                      type="text"
                      @change="v$.phone.$touch"
                      class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      :class="{
                        'border-red-500 focus:border-red-500': v$.phone.$error,
                        'border-[#42d392] ': !v$.phone.$invalid
                      }"
                    />
                    <Icon
                      v-if="!v$.phone.$invalid || v$.phone.$error"
                      class="absolute right-2 h-full text-xl text-green-500"
                      :class="{
                        'text-green-500': !v$.phone.$invalid,
                        'text-yellow-500': v$.phone.$error
                      }"
                      :name="`heroicons-solid:${!v$.phone.$error ? 'check-circle' : 'exclamation'}`"
                    />
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <button
                    id="register"
                    @click="submitForm"
                    class="bg-primary-800 hover:bg-primary-default transition-colors duration-300 text-text-50 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </section>
        </template>

        <script setup>
        import { useFormStore } from '../../stores/value'
        import {
          minLength,
          required,
          email,
          sameAs,
          maxLength,
          helpers
        } from '@vuelidate/validators'
        import { useVuelidate } from '@vuelidate/core'
        import { ref, defineEmits } from 'vue'
        import { useRouter } from 'vue-router'

        const rules = computed(() => {
          return {
            country: {
              required: helpers.withMessage('The country field is required', required)
            },
            city: {
              required: helpers.withMessage('The city field is required', required)
            },
            date: {
              required: helpers.withMessage(
                'The dateOfBirth field is required',
                required
              )
            },
            phone: {
              required: helpers.withMessage('The password field is required', required),
              int: maxLength(10),
              int: minLength(10)
            }
          }
        })

        const emit = defineEmits(['previous-step'])

        const formStore = useFormStore()
        const formData = formStore.formData
        const router = useRouter()

        const message = ref('')
        const messageClass = ref('')

        const isSubmitting = ref(false)
        const v$ = useVuelidate(rules, formData)

        const previousStep = () => {
          if (formData) {
            formStore.setFormData(formData)
            emit('previous-step')
            console.log(formData)
          } else {
            console.error('formData is undefined')
          }
        }

        const submitForm = async () => {
          if (isSubmitting.value) return
          isSubmitting.value = true

          v$.value.$validate()

          // if (!v$.value.$error) {
          try {
            console.log('Submitting form', formData)
            console.log('JSON.stringify(formData)', JSON.stringify(formData))
            console.log(formData.dateofbirth)

            const isoDateString = formData.dateofbirth.toISOString()

            const dateInUTC = new Date(isoDateString)

            const dateInCEST = new Date(dateInUTC.getTime() + 60 * 60 * 1000)

            const formattedDateOfBirth = dateInCEST.toISOString()

            console.log(formattedDateOfBirth)

            const response = await fetch('http://localhost:3003/User/User', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                country: formData.country,
                city: formData.city,
                dateofbirth: formattedDateOfBirth,
                phone: formData.phone
              })
            })

            if (!response.ok) {
              const data = await response.json()
              throw new Error(data.error)
            }

            const data = await response.json()
            message.value = 'User added successfully'
            messageClass.value = 'text-green-500'
            console.log('Registration successful', data)
            formData.firstName = ''
            formData.lastName = ''
            formData.email = ''
            formData.password = ''
            formData.country = ''
            formData.city = ''
            formData.dateofbirth = ''
            formData.phone = ''
            router.push('/login')
          } catch (error) {
            console.error('Error during fetch request', error)
            message.value = error.message
            messageClass.value = 'text-red-500'
          } finally {
            isSubmitting.value = false
          }
          // }
        }
        </script>
