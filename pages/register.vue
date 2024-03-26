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
  
          <component :is="formSteps[currentStep]" @next-step="nextStep" @previous-step="previousStep" @constant-one-emitted="handleFirstMainStep" @constant-two-emitted="handleSecondStep"/> 
  
          <div class="flex flex-col items-center justify-between">
            <button
              type="button"
              @click="submitForm"
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
            <NuxtLink to="/Login" class="hover:underline decoration-solid text-bleu">
              Se Connecter
            </NuxtLink>
          </div>
        </form>
        <p v-if="message" :class="messageClass" class="text-center font-bold mt-3">{{ message }}</p>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from "vue";
import StepOne from '../components/teststeps/stepOne.vue';
import StepTwo from '../components/teststeps/stepTwo.vue';
import StepThree from '../components/teststeps/stepThree.vue';
import StepFour from '../components/teststeps/stepFour.vue';
import FinalStep from '../components/teststeps/finalStep.vue';
  
  const user = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  export {
    data()=>{
        return{
            progressStyleOne: '',
            progressStyleTwo: '',
        }
    },
    setup() {
        const currentStep = ref(0);
        const nextStep = () => {
        currentStep.value++;
        };
        const previousStep = () => {
            currentStep.value--;
        };
        const formSteps = [
            Step1,
            Step2,
            Step3,
            Step4,
            FinalStep,
        ];
        return {
            nextStep,   
            previousStep,   
            currentStep,
            formSteps,
        };
    }
    methods: {
        handleFirstMainStep(mainStep) {
            this.progressStyleOne = mainStep;
        }
        handleSecondStep(secondStep) {
            this.progressStyleTwo = secondStep;
        }
    }
}
  
  const message = ref("");
  const messageClass = ref("");
  
  async function submitForm() {
    console.log("Soumission du formulaire", user.value);
    console.log("JSON.stringify(user.value)", JSON.stringify(user.value));
    try {
      const response = await fetch("http://localhost:3003/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.value.firstName,
          lastName: user.value.lastName,
          email: user.value.email,
          password: user.value.password,
        }),
      });
  
      console.log("Requête fetch complétée", response);
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
  
      const data = await response.json();
      message.value = "Utilisateur ajouté avec succès";
      messageClass.value = "text-green-500"; 
      console.log("Inscription réussie", data);
      user.value.firstName = "";
      user.value.lastName = "";
      user.value.email = "";
      user.value.password = "";
    } catch (error) {
      console.error("Erreur lors de la requête fetch", error);
      message.value = error.message;
      messageClass.value = "text-red-500";
    }

  }
  
  </script>
  
  
  <style>
  html,
  body {
    height: 100%;
    margin: 0;
  }
  </style>
  