<template>
  <form @submit.prevent="submitForm">
    <label>
      Email:
      <input v-model="user.email" type="email" required />
    </label>
    <label>
      Mot de passe:
      <input v-model="user.password" type="password" required />
    </label>
    <button type="submit">Connexion</button>
  </form>
</template>

<script>
import { onMounted, ref } from "vue";
import { checkTokenAndRedirect } from "../../utils/utils";

export default {
  setup() {
    const user = ref({ email: "", password: "" });

    async function submitForm() {
      try {
        const response = await fetch("http://localhost:3003/user/loginUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.value.email,
            password: user.value.password,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(checkTokenAndRedirect);
    return { user, submitForm };
  },
};
</script>
../../utils/utils
