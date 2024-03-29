<template>
  <section class="bg-[#2D3758] w-screen h-screen flex justify-center">
    <div class="w-96 my-28">
      <form
        @submit.prevent="submitForm"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2"
      >
      <button
          @click="previousStep"
        >
        <Icon name="octicon:arrow-left-24" color="bleu" />

        </button>
        <div class="flex justify-center items-center">
          <img src="/assets/images/logo-transparent.png" class="w-28 h-28" />
        </div>

        <h1 class="text-2xl font-bold mb-5 text-center">
          Ajouter un utilisateur
        </h1>
        <div class="mb-4">
          <label
            for="country"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Pays</label
          >
          <div class="relative">
            <input
            id="country"
            name="country"
            v-model="formData.country"
            type="text"
            @change="v$.country.$touch"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            :class="{
                      'border-red-500 focus:border-red-500': v$.country.$error,
                      'border-[#42d392] ': !v$.country.$invalid,
                    }"
          />
          <Icon
              v-if="!v$.country.$invalid || v$.country.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.country.$invalid, 'text-yellow-500': v$.country.$error }"
              :name="`heroicons-solid:${!v$.country.$error ? 'check-circle' : 'exclamation'}`"
          />
          </div>
        </div>
        <div class="mb-3">
          <label for="city" class="block text-gray-700 text-sm font-bold mb-2"
            >Ville</label
          >
          <div class="relative">
            <input
            id="city"
            name="city"
            v-model="formData.city"
            type="text"
            @change="v$.city.$touch"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            :class="{
                      'border-red-500 focus:border-red-500': v$.city.$error,
                      'border-[#42d392] ': !v$.city.$invalid,
                    }"
          />
          <Icon
              v-if="!v$.city.$invalid || v$.city.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.city.$invalid, 'text-yellow-500': v$.city.$error }"
              :name="`heroicons-solid:${!v$.city.$error ? 'check-circle' : 'exclamation'}`"
          />
          </div>
        </div>
        <div class="mb-3">
          <label for="city" class="block text-gray-700 text-sm font-bold mb-2"
            >Date de naissance</label
          >
          <VDatePicker v-model="formData.dateOfBirth" :popover="false">
    <template #default="{ togglePopover, inputValue, inputEvents }">
      <div
        class="flex "
      >
        <button
          class="shadow appearance-none border rounded w-12 py-2 pb-3 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-bleu"
          @click="() => togglePopover()"
        >
        <Icon name="octicon:calendar" color="white" />

    </button>
<div class="relative">
  <input
        id="date"
        name="date"
          :value="inputValue"
          v-on="inputEvents"
          @change="v$.date.$touch"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-70 leading-tight focus:outline-none focus:shadow-outline"
          :class="{
                      'border-red-500 focus:border-red-500': v$.date.$error,
                      'border-[#42d392] ': !v$.date.$invalid,
                    }"
        />
        <Icon
              v-if="!v$.date.$invalid || v$.date.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.date.$invalid, 'text-yellow-500': v$.date.$error }"
              :name="`heroicons-solid:${!v$.date.$error ? 'check-circle' : 'exclamation'}`"
          />
</div>
        
      </div>
    </template>
  </VDatePicker>
        </div>
        <div class="mb-6">
          <label for="phone" class="block text-gray-700 text-sm font-bold mb-2"
            >Numéro de téléphone</label
          >
          <div class="relative">
            <input
            id="phone"
            name="phone"
            v-model="formData.phone"
            type="text"
            @change="v$.phone.$touch"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            :class="{
                      'border-red-500 focus:border-red-500': v$.phone.$error,
                      'border-[#42d392] ': !v$.phone.$invalid,
                    }"
          />
          <Icon
              v-if="!v$.phone.$invalid || v$.phone.$error"
              class="absolute right-2 h-full text-xl text-green-500"
              :class="{ 'text-green-500': !v$.phone.$invalid, 'text-yellow-500': v$.phone.$error }"
              :name="`heroicons-solid:${!v$.phone.$error ? 'check-circle' : 'exclamation'}`"
          />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
          @click="submitForm"
          class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-2"          >
            Inscription
        </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { useFormStore } from '../../stores/value';
import { required, email, sameAs, maxLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { ref, defineEmits } from 'vue';
import { useRouter } from "vue-router";

const rules = computed(() => {
  return {
    country:{
      required: helpers.withMessage('The firstname field is required', required),
    },
    city:{
      required: helpers.withMessage('The lastname field is required', required),
    },
    date: {
      required: helpers.withMessage('The email field is required', required),
    },
    phone: {
      required: helpers.withMessage('The password field is required', required),
      number: maxLength(10),
    },
  };
});

const  emit  = defineEmits([ 'previous-step']);

const formStore = useFormStore();
const formData = formStore.formData;
const router = useRouter();

const date = ref(new Date());

const message = ref("");
const messageClass = ref("");

const isSubmitting = ref(false);
const v$ = useVuelidate(rules, formData);


const previousStep = () => {
  if (formData) {
    formStore.setFormData(formData);
    emit('previous-step');
    console.log(formData);
  } else {
    console.error("formData is undefined");
  }
};

async function submitForm (){

  v$.value.$validate(); 
  if (isSubmitting.value) return; 
  isSubmitting.value = true; 
  
  if (!v$.value.$error) {
    try {
    console.log("Soumission du formulaire", formData);
    console.log("JSON.stringify(formData)", JSON.stringify(formData));
    console.log(formData.dateOfBirth);

const isoDateString = formData.dateOfBirth.toISOString();

const dateInUTC = new Date(isoDateString);

const dateInCEST = new Date(dateInUTC.getTime() + (60 * 120 * 1000)); 

const formattedDateOfBirth = dateInCEST.toISOString();

console.log(formattedDateOfBirth);



    const response = await fetch("http://localhost:3003/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        city: formData.city,
        dateofbirth: formattedDateOfBirth,
        phone: formData.phone,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    const data = await response.json();
    message.value = "Utilisateur ajouté avec succès";
    messageClass.value = "text-green-500";
    console.log("Inscription réussie", data);
    formData.firstName = "";
    formData.lastName = "";
    formData.email = "";
    formData.password = "";
    formData.country = "";
    formData.city = "";
    formData.date = "";
    formData.phone = "";
  } catch (error) {
    console.error("Erreur lors de la requête fetch", error);
    message.value = error.message;
    messageClass.value = "text-red-500";
  }finally {
    isSubmitting.value = false; 
  }
  }

  
};
</script>
