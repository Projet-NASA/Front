<template>
  <section
    :class="[
      'h-full',
      'flex',
      'justify-center',
      'items-center',
      'w-full',
      'lg:w-1/2',
      'top-0',
      'right-0',
      'lg:left-1/4',
      'z-50',
      'absolute'
    ]"
  >
    <div class="w-full sm:w-3/4 md:w-2/3 lg:w-full">
      <form
        @submit.prevent="submitForm"
        class="bg-background-200 shadow-md rounded px-8 pt-6 pb-8 mb-2"
      >
        <h1 class="text-2xl font-bold mb-5 text-center text-text-default">
          Experience
        </h1>
        <div class="flex flex-col justify-center w-3/4 mx-auto space-y-3">
          <div>
            <label
              for="current"
              class="block text-text-default text-base font-bold mb-2"
              >Title</label
            >
            <input
              id="title"
              v-model="title"
              type="text"
              required
              class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              for="company"
              class="block text-text-default text-base font-bold mb-2"
              >Company</label
            >
            <input
              id="company"
              v-model="company"
              type="text"
              required
              class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              for="location"
              class="block text-text-default text-base font-bold mb-2"
              >Location</label
            >
            <input
              id="location"
              type="text"
              v-model="location"
              required
              class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              for="type"
              class="block text-text-default text-base font-bold mb-2"
              >Type</label
            >
            <select
              id="type"
              v-model="type"
              required
              class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled selected>Select a type</option>
              <option value="internship">Internship</option>
              <option value="apprenticeship">Apprenticeship</option>
              <option value="fixed-term-contract">Fixed-term contract</option>
              <option value="permanent-contract">Permanent contract</option>
            </select>
          </div>
          <div class="flex flex-col sm:flex-row justify-between">
            <div class="w-full sm:w-1/2 mr-0 sm:mr-4">
              <label
                for="from"
                class="block text-text-default text-base font-bold mb-2"
                >From</label
              >
              <input
                id="from"
                v-model="from"
                type="date"
                required
                class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="w-full sm:w-1/2 ml-0 sm:ml-4">
              <label
                for="to"
                class="block text-text-default text-base font-bold mb-2"
                >To</label
              >
              <input
                id="to"
                v-model="to"
                type="date"
                class="align-middle bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div class="inline-flex items-center">
                <label
                  class="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="check"
                >
                  <input
                    type="checkbox"
                    v-model="current"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary-800 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primary-800 before:opacity-0 before:transition-opacity checked:border-primary-800 checked:bg-primary-800 checked:before:bg-primary-800 hover:before:opacity-10"
                    id="check"
                  />
                  <span
                    class="absolute text-primary-default transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  class="mt-px text-text-default cursor-pointer select-none"
                  htmlFor="check"
                >
                  Current
                </label>
              </div>
            </div>
          </div>
          <div>
            <label
              for="description"
              class="block text-text-default text-base font-bold mb-2"
              >Description</label
            >
            <textarea
              id="description"
              v-model="description"
              required
              class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full h-40 py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <button
            type="submit"
            class="bg-primary-default hover:bg-primary-400 click:bg-primary-400 text-text-default font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRoute()
const title = ref('')
const company = ref('')
const from = ref('')
const to = ref('')
const description = ref('')
const location = ref('')
const type = ref('')
const current = ref(false)
const userId = router.params.profile

console.log(userId)
const submitForm = async () => {
  let toDate = to.value
  if (current.value) {
    toDate = new Date().toISOString().split('T')[0]
  }

  const experienceData = {
    title: title.value,
    company: company.value,
    location: location.value,
    from: from.value,
    to: toDate,
    current: current.value,
    type: type.value,
    description: description.value,
    userId: userId
  }

  const url = 'http://localhost:3003/experience/createExperience'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(experienceData)
    })

    if (response.ok) {
      console.log('Job added successfully')
      reloadNuxtApp()
    } else {
      console.error('Failed to add experience')
    }

    const responseData = await response.json()
    console.log('Success:', responseData)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>
