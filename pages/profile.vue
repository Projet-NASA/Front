<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <h1>Informations utilisateur</h1>
      <pre>{{ user }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      error: null
    }
  },

  async mounted() {
    try {
      const userId = localStorage.getItem('userId')
      const response = await fetch(
        `http://localhost:3003/user/OneUser/${userId}`
      )

      const data = await response.json()
      console.log(data)

      if (!response.ok) {
        this.error = data.error
      } else {
        this.user = data
      }
    } catch (error) {
      this.error =
        'erreur lors de la conversion de la réponse en JSON: ' + error.message
    }
  }
}
</script>
