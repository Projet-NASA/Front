<template>
  <section class="min-h-screen flex justify-center items-center w-full">
    <div class="w-full max-w-xs">
      <form @submit.prevent="submitRequest" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Email">
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-primary-800 hover:bg-primary-default text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Réinitialiser le mot de passe
          </button>
        </div>
      </form>
      <p v-if="message" class="text-center text-red-500 text-xs">{{ message }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">


const email = ref('')
const message = ref('')
const router = useRouter()

async function submitRequest() {
  try {
    // Remplacez `apiURL.forgotPassword` par l'URL de votre endpoint de réinitialisation du mot de passe
    const response = await fetch("http://localhost:3003/user/forgotPassword", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    })

    if (!response.ok) {
      throw new Error('Une erreur est survenue lors de l\'envoi de la demande de réinitialisation.')
    }

    // Ici, vous pouvez ajuster la logique en fonction de la réponse de votre API.
    // Par exemple, certaines API envoient un message même si l'email n'est pas reconnu pour des raisons de sécurité.
    message.value = "Si votre email correspond à un compte chez nous, un lien de réinitialisation vous sera envoyé."
  } catch (error) {
    message.value = 'Une erreur est survenue.'
  }
}
</script>
