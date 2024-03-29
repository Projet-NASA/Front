<template>
  <section
    class="bg-[#2D3758] w-full min-h-screen flex justify-center items-center"
  >

        <component
          :is="formSteps[currentStep]"
          @next-step="nextStep"
          @previous-step="previousStep"
        />

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
