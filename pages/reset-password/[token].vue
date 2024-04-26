<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="resetPassword"
      class="bg-background-200 shadow-md rounded px-8 pt-6 pb-8 mb-2"
    >
      <input
        v-model="newPassword"
        type="password"
        placeholder="Nouveau mot de passe"
        class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirmez le mot de passe"
        class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        @click.prevent="resetPassword"
        class="bg-primary-800 hover:bg-primary-default transition-colors duration-300 text-text-50 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
      >
        Réinitialiser le mot de passe
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const token = router.currentRoute.value.params.token
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    message.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  try {
    console.log('bouton cliqué')
    console.log(newPassword.value)
    console.log(token)

    const response = await fetch('http://localhost:3003/user/resetPassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        password: newPassword.value
      })
    })

    if (!response.ok) {
      throw new Error(await response.text())
    }

    message.value = 'Votre mot de passe a été réinitialisé avec succès.'
    router.push('/login')
  } catch (error) {
    message.value = error.message
  }
}
</script>
