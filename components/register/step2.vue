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
          <input
            id="country"
            v-model="formData.country"
            type="country"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-3">
          <label for="city" class="block text-gray-700 text-sm font-bold mb-2"
            >Ville</label
          >
          <input
            id="city"
            v-model="formData.city"
            type="city"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
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
        <input
          :value="inputValue"
          v-on="inputEvents"
      
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </template>
  </VDatePicker>
        </div>
        <div class="mb-6">
          <label for="phone" class="block text-gray-700 text-sm font-bold mb-2"
            >Numéro de téléphone</label
          >
          <input
            id="phone"
            v-model="formData.phone"
            type="phone"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
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
import { ref, defineEmits } from 'vue';
import { useRouter } from "vue-router";

const  emit  = defineEmits([ 'previous-step']);

const formStore = useFormStore();
const formData = formStore.formData;
const router = useRouter();

const date = ref(new Date());

const message = ref("");
const messageClass = ref("");

const isSubmitting = ref(false)


const previousStep = () => {
  if (formData) {
    formStore.setFormData(formData);
    emit('previous-step');
    console.log(formData);
  } else {
    console.error("formData is undefined");
  }
};

const submitForm = async () => {
  if (isSubmitting.value) return; 
  isSubmitting.value = true; 

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
};
</script>
