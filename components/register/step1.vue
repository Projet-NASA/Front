<template>
  <section
    class="bg-[#2D3758] w-full min-h-screen flex justify-center items-center"
  >
    <div class="w-96">
      <form
        schema:schema
        state:state
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
          <div class="relative">
            <input
            id="firstName"
            name="firstName"
            v-model="formData.firstName"
            type="text"
            @change="v$.firstName.$touch"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            :class="{
                      'border-red-500 focus:border-red-500': v$.firstName.$error,
                      'border-[#42d392] ': !v$.firstName.$invalid,
                    }"
          />
          <Icon
              v-if="!v$.firstName.$invalid || v$.firstName.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.firstName.$invalid, 'text-yellow-500': v$.firstName.$error }"
              :name="`heroicons-solid:${!v$.firstName.$error ? 'check-circle' : 'exclamation'}`"
          />
          </div>
        </div>

        <div class="mb-4">
          <label
            for="lastName"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Nom
          </label>
          <div class="relative">
            <input
            id="lastName"
            name="lastName"
            v-model="formData.lastName"
            type="text"
            @change="v$.lastName.$touch"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            :class="{
                      'border-red-500 focus:border-red-500': v$.lastName.$error,
                      'border-[#42d392] ': !v$.lastName.$invalid,
                    }"
          />
          <Icon
              v-if="!v$.lastName.$invalid || v$.lastName.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.lastName.$invalid, 'text-yellow-500': v$.lastName.$error }"
              :name="`heroicons-solid:${!v$.lastName.$error ? 'check-circle' : 'exclamation'}`"
          />
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            E-mail
          </label>
         <div class="relative">
          <input
            id="email"
            name="email"
            v-model="formData.email"
            type="text"
            @change="v$.email.$touch"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{
                      'border-red-500 focus:border-red-500': v$.email.$error,
                      'border-[#42d392] ': !v$.email.$invalid,
                    }"
  
          />
          <Icon
              v-if="!v$.email.$invalid || v$.email.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.email.$invalid, 'text-yellow-500': v$.email.$error }"
              :name="`heroicons-solid:${!v$.email.$error ? 'check-circle' : 'exclamation'}`"
          />
         </div>
         

        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Mot de passe (Minimum 6 caractères)
          </label>
          <div class="relative">
            <input
            id="password"
            name="password"
            v-model="formData.password"
            type="password"
            @change="v$.password.$touch"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            :class="{
                      'border-red-500 focus:border-red-500': v$.password.$error,
                      'border-[#42d392] ': !v$.password.$invalid,
                    }"
          />
          <Icon
              v-if="!v$.password.$invalid || v$.password.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.password.$invalid, 'text-yellow-500': v$.password.$error }"
              :name="`heroicons-solid:${!v$.password.$error ? 'check-circle' : 'exclamation'}`"
          />
          </div>
        </div>

        <div class="flex flex-col items-center justify-between">
          <button
            type="button"
            @click="nextStep"
            class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-2"
          >
            Suivant
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

<script setup>
import { useFormStore } from '../../stores/value';
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { defineEmits } from 'vue';



const rules = computed(() => {
  return {
    firstName:{
      required: helpers.withMessage('The firstname field is required', required),
    },
    lastName:{
      required: helpers.withMessage('The lastname field is required', required),
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email),
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6),
    },
  };
});



const  emit  = defineEmits([ 'next-step']);

const formStore = useFormStore();
const formData = formStore.formData;

const v$ = useVuelidate(rules, formData);

const nextStep = () => {
    formStore.setFormData(formData);
    emit('next-step');
};

</script>