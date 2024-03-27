<template>
  <section class="bg-[#2D3758] w-screen h-screen flex justify-center">
    <div class="w-96 my-28">
      <form
        @submit.prevent="submitForm"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2"
      >
        <div class="flex justify-center items-center">
          <img src="../assets/images/logo-transparent.png" class="w-28 h-28" />
        </div>

        <h1 class="text-2xl font-bold mb-5 text-center">S'identifier</h1>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >E-mail</label
          >
          <input
            id="email"
            v-model="user.email"
            type="email"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-6">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
            >Mot de passe</label
          >
          <input
            id="password"
            v-model="user.password"
            type="password"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-80"
          >
            Connexion
          </button>
        </div>
        <div class="flex items-center my-4">
          <div class="h-px w-36 bg-violet"></div>
          <p class="mx-2">OU</p>
          <div class="h-px w-36 bg-violet"></div>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-80"
          >
            S'identifier avec Google
          </button>
        </div>

        <div class="flex justify-center gap-4 my-4">
          <p>Pas de compte ?</p>
          <NuxtLink
            to="/register/step1"
            class="hover:underline decoration-solid text-bleu"
          >
            S'inscrire
          </NuxtLink>
        </div>
      </form>
      <p v-if="message" class="text-center text-bold mt-3">{{ message }}</p>
    </div>
  </section>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import apiURL from "../utils/apiURLs";

export default {
  setup() {
    const user = ref({ email: "", password: "" });
    const router = useRouter();

    async function submitForm() {
      try {
        const response = await fetch(apiURL.loginUser, {
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
        localStorage.setItem("token", data.token);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
    return { user, submitForm };
  },
};
</script>
