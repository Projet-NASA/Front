<template>
  <div class="profile-page">
    <h1>Profil</h1>
    <div v-if="user">
      <p>Email: {{ user.email }}</p>
      <p>Téléphone: {{ user.phone }}</p>
      <button @click="logout">Déconnexion</button>
    </div>
    <div v-else>
      <p>Chargement des informations de l'utilisateur...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await fetch('http://localhost:3003/user/session', {
          credentials: 'include' 
        });

        if (!response.ok) {
          throw new Error("Impossible de récupérer les informations de l'utilisateur");
        }

        const { user } = await response.json();
        this.user = user;
      } catch (error) {
        console.error(error.message);
      }
    },
    async logout() {
      try {
        const response = await fetch('http://localhost:3003/user/logout', {
          method: 'POST',
          credentials: 'include' 
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la déconnexion");
        }

        this.user = null;

      } catch (error) {
        console.error(error.message);
      }
    }
  }
}
</script>
