<template>
  <section
    class="bg-[#2D3758] w-full min-h-screen flex justify-center items-center"
  >

        <component
          :is="formSteps[currentStep]"
          @next-step="nextStep"
          @previous-step="previousStep"
          @constant-one-emitted="handleFirstMainStep"
          @constant-two-emitted="handleSecondStep"
        />

  </section>
</template>

<script setup>
import { ref } from "vue";
import Step1 from "../components/register/step1.vue";
import Step2 from "../components/register/step2.vue";
import Step3 from "../components/register/step3.vue";
// import Step4 from "../components/register/step4.vue";

const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const data = () => {
  return {
    progressStyleOne: "",
    progressStyleTwo: "",
  };
};

const methods = {
  handleFirstMainStep(mainStep) {
    this.progressStyleOne = mainStep;
  },
  handleSecondStep(secondStep) {
    this.progressStyleTwo = secondStep;
  },
};

const currentStep = ref(0);
const nextStep = () => {
  currentStep.value++;
};
const previousStep = () => {
  currentStep.value--;
};
const formSteps = [Step1, Step2, Step3];

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
