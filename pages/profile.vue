<template>
  <div class="profile-page">
    <h1>Profil</h1>
    <div v-if="user">
      <p>Email: {{ user.email }}</p>
      <p>Téléphone: {{ user.phone }}</p>
    </div>
    <div v-else>
      <p>Chargement des informations de l'utilisateur...</p>
    </div>
  </div>
</template>

<script>
import apiURL from '../utils/apiURLs'

export default {
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
      }
      try {
        const response = await fetch(`http://localhost:3003/user/OneUser/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Impossible de récupérer les données de l'utilisateur");
        }

        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error(error.message);
      }
    }
  }
}
</script>
