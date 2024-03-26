<template>
  <section class="bg-[#2D3758] w-screen h-screen flex justify-center">
    <div class="w-96 my-28">
      <form
        @submit.prevent="submitForm"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2"
      >
        <div class="flex justify-center items-center">
          <img src="/assets/images/logo-transparent.png" class="w-28 h-28" />
        </div>

        <h1 class="text-2xl font-bold mb-5 text-center">
          Ajouter un utilisateur
        </h1>
        <div class="mb-4">
          <label
            for="firstname"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Prénom</label
          >
          <input
            id="firstname"
            v-model="user.firstname"
            type="firstname"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-6">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
            >Nom</label
          >
          <input
            id="name"
            v-model="user.name"
            type="text"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-between">
          <NuxtLink
            to="step3"
            class="flex items-center justify-center bg-[#8A01F5] hover:bg-[#2D3758] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-80"
          >
            Inscription
          </NuxtLink>
        </div>
      </form>
      <p v-if="message" class="text-center text-bold mt-3">{{ message }}</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { checkTokenAndRedirect } from "../../utils/utils";

const user = ref({
  email: "",
  name: "",
});

const message = ref("");

async function submitForm() {
  if (!user.value.email || !user.value.name) {
    message.value = "Veuillez remplir tous les champs";
    return;
  }

  try {
    const response = await fetch("http://localhost:3003/user/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.value.email,
        name: user.value.name,
      }),
    });

    if (!response.ok) {
      throw new Error("La requête a échoué");
    }

    const data = await response.json();
    message.value = "Utilisateur ajouté avec succès";
    console.log(data);
    user.value.email = "";
    user.value.name = "";
  } catch (error) {
    message.value = "Erreur lors de l'ajout de l'utilisateur";
    console.error(error);
  }
}
onMounted(checkTokenAndRedirect);
</script>
