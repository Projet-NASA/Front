<template>
  <div>
    <h1>Ajouter un utilisateur</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="user.email" type="email" required>
      </div>
      <div>
        <label for="name">Nom:</label>
        <input id="name" v-model="user.name" type="text" required>
      </div>
      <button type="submit">Envoyer</button>
    </form>
    <p v-if="message">{{ message }}</p>
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
  console.log(user.value.name);
  console.log(user.value.email);

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
