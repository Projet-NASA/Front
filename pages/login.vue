<template>
  <section class="bg-background-default min-h-screen flex justify-center items-center w-full">
    <div class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 my-8">
      <form @submit.prevent="submitForm" class="bg-background-200 shadow-md rounded px-8 pt-6 pb-8 mb-2">
        <div class="flex justify-center items-center mb-8">
          <img src="../assets/images/logo-transparent.png" class="w-28 h-28" />
        </div>

        <h1 class="text-2xl font-bold mb-5 text-center text-text-default">
          Sign In
        </h1>
        <div class="mb-4">
          <label for="email" class="block text-text-default text-sm font-bold mb-2">Email</label>
          <input id="email" v-model="user.email" type="email" required
            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-text-default text-sm font-bold mb-2">Password</label>
          <input id="password" v-model="user.password" type="password" required
            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="flex flex-col items-center justify-between mb-8">
          <div class="flex items-center justify-between w-full mb-4">
            <button type="submit"
              class="bg-primary-800 hover:bg-primary-default transition-colors duration-300 text-text-50 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full">
              Sign In
            </button>
          </div>
          <div class="flex items-center mb-4">
            <div class="h-px w-36 bg-primary-default"></div>
            <p class="mx-2 text-text-default">OR</p>
            <div class="h-px w-36 bg-primary-default"></div>
          </div>
          <div class="flex items-center justify-between w-full">
            <button
              class="bg-primary-800 hover:bg-primary-default transition-colors duration-300 text-text-50 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full">
              Sign In with Google
            </button>
          </div>
        </div>

        <div class="flex justify-center gap-4 mb-4">
          <p class="text-text-default">Don't have an account?</p>
          <NuxtLink to="/register" class="hover:underline decoration-solid text-text-default">
            Sign Up
          </NuxtLink>
        </div>
        <div class="text-right">
          <NuxtLink to="/forgot-password" class="text-sm text-primary-800 hover:text-primary-default">
            Mot de passe oublié ?
          </NuxtLink>
        </div>
      </form>
      <p v-if="message" class="text-center text-bold mt-3">{{ message }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import apiURL from '../utils/apiURLs'

export default {
  setup() {
    const user = ref({ email: '', password: '' })
    const message = ref('')
    const router = useRouter()

    async function submitForm() {
      try {
        const response = await fetch(apiURL.loginUser, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.value.email,
            password: user.value.password
          })
        })

        if (!response.ok) {
          const data = await response.json()
          message.value = data.error
          throw new Error(data.error)
        }

        const data = await response.json()
        console.log(data)
        router.push('/')

        localStorage.setItem('sessionId', data.sessionId)
      } catch (error) {
        console.error(error)
      }
    }
    return { user, submitForm, message }
  }
}
</script>
