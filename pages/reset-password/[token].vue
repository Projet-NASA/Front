<template>
  <div>
    <form @submit.prevent="resetPassword">
      <input v-model="newPassword" type="password" placeholder="Nouveau mot de passe" />
      <input v-model="confirmPassword" type="password" placeholder="Confirmez le mot de passe" />
      <button @click.prevent="resetPassword">Réinitialiser le mot de passe</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()
const token = router.currentRoute.value.params.token
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    message.value = "Les mots de passe ne correspondent pas."
    return
  }

  try {
    console.log('bouton cliqué')
    console.log( newPassword.value)
    console.log( token)

    const response = await fetch('http://localhost:3003/user/resetPassword', { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        password: newPassword.value,
      }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    message.value = "Votre mot de passe a été réinitialisé avec succès."
    router.push('/login');
  } catch (error) {
    message.value = error.message;
  }
}
</script>
