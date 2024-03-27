<template>
  <section
    class="bg-[#2D3758] w-full min-h-screen flex justify-center items-center"
  >
    <div class="w-96">
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
            for="firstName"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Prénom
          </label>
          <input
            id="firstName"
            v-model="formData.firstName"
            type="text"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label
            for="lastName"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Nom
          </label>
          <input
            id="lastName"
            v-model="formData.lastName"
            type="text"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            E-mail
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Mot de passe (Minimum 6 caractères)
          </label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div class="flex flex-col items-center justify-between">
          <button
            type="button"
            @click="nextStep"
            class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-2"
          >
            S'inscrire
          </button>

          <div class="flex items-center my-4">
            <div class="h-px w-36 bg-violet"></div>
            <p class="mx-2">OU</p>
            <div class="h-px w-36 bg-violet"></div>
          </div>
          <button
            type="submit"
            class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-2"
          >
            S'identifier avec Google
          </button>
        </div>

        <div class="flex justify-center gap-4 my-4">
          <p>Vous avez déjà un compte ?</p>
          <NuxtLink
            to="/Login"
            class="hover:underline decoration-solid text-bleu"
          >
            Se Connecter
          </NuxtLink>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useFormStore } from '../../stores/value';
export default {
  emits: ['next-step','previous-step'],
  setup(_, { emit }) {
    const formStore = useFormStore();
    const formData = formStore.formData;

    const nextStep = () => {

      formStore.setFormData(formData);
      emit('next-step');
    };
    const previousStep = () => {
       if (formData) {
    formStore.setFormData(formData);
    emit('next-step');
  } else {
    console.error("formData is undefined");
  }
    };

    return {
      formData,
      nextStep,
      previousStep,
    };
  },
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
</style>
