<template>
  <section class="min-h-screen flex justify-center items-center w-full">
    <div class="w-full max-w-xs">
      <form
        @submit.prevent="submitRequest"
        class="bg-background-200 shadow-md rounded px-8 pt-6 pb-8 mb-2"
      >
        <div class="mb-4">
          <label
            class="block text-text-default text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            v-model="email"
            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-primary-800 hover:bg-primary-default transition-colors duration-300 text-text-50 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Réinitialiser le mot de passe
          </button>
        </div>
      </form>
      <p v-if="message" class="text-center text-red-500 text-xs">
        {{ message }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')
const message = ref('')
const router = useRouter()

async function submitRequest() {
  try {
    const response = await fetch('http://localhost:3003/user/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    })

    if (!response.ok) {
      throw new Error(
        "Une erreur est survenue lors de l'envoi de la demande de réinitialisation."
      )
    }

    message.value =
      'Si votre email correspond à un compte chez nous, un lien de réinitialisation vous sera envoyé.'
  } catch (error) {
    message.value = 'Une erreur est survenue.'
  }
}
</script>
