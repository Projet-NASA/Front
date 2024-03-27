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
        <div class="mb-6">
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
        <div class="mb-6">
          <label for="city" class="block text-gray-700 text-sm font-bold mb-2"
            >Date de naissance</label
          >
          <VDatePicker v-model="date" :popover="false">
    <template #default="{ togglePopover, inputValue, inputEvents }">
      <div
        class="flex "
      >
        <button
          class="shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-bleu"
          @click="() => togglePopover()"
        >
        <CalendarDays class="text-white" />
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
        <div class="flex items-center justify-between">
          <button
          class="bg-bleu hover:bg-violet text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-2"          >
            Inscription
        </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useFormStore } from '../../stores/value';
import { ref } from 'vue';
import { CalendarDays } from 'lucide-vue-next';
const date = ref(new Date());
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