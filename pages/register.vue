<template>
  <section
    class="bg-[#2D3758] w-full min-h-screen flex justify-center items-center"
  >

        <component
          :is="formSteps[currentStep]"
          @next-step="nextStep"
          @previous-step="previousStep"
        />
        <button
            type="button"
            @click="nextStep"
            class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-2"
          >
            S'inscrire
          </button>
          <button
            type="button"
            @click="previousStep"
            class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-2"
          >
            S'inscrire
          </button>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Step1 from "../components/register/step1.vue";
import Step2 from "../components/register/step2.vue";

const currentStep = ref(0);
const nextStep = () => {
  currentStep.value++;
};
const previousStep = () => {
  currentStep.value--;
};
const formSteps = [Step1, Step2];
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
</style>
