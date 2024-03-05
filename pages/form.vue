<template>
  <div class="max-w-md mx-auto my-10">
    <h1 class="text-2xl font-bold mb-5 text-center">Ajouter un utilisateur</h1>
    <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input id="email" v-model="user.email" type="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
        <input id="name" v-model="user.name" type="text" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Envoyer
        </button>
      </div>
    </form>
    <p v-if="message" class="text-center text-bold mt-3">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  email: '',
  name: ''
});

const message = ref('');

async function submitForm() {
  if (!user.value.email || !user.value.name) {
    message.value = 'Veuillez remplir tous les champs';
    return;
  }
  try {
    const response = await fetch('http://localhost:3003/user/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.value.email,
        name: user.value.name,
      }),
    });

    if (!response.ok) {
      throw new Error('La requête a échoué');
    }

    const data = await response.json();
    message.value = 'Utilisateur ajouté avec succès';
    console.log(data);
    user.value.email = '';
    user.value.name = '';
  } catch (error) {
    message.value = 'Erreur lors de l\'ajout de l\'utilisateur';
    console.error(error);
  }
}
</script>
