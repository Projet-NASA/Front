<template>
  <div class="flex justify-center items-center h-screen">
    <NuxtLink
      to="/register"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Aller au formulaire
    </NuxtLink>
  </div>
  <VDatePicker v-model="date" :popover="false">
    <template #default="{ togglePopover, inputValue, inputEvents }">
      <div
        class="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden"
      >
        <button
          class="flex justify-center items-center px-2 bg-accent-100 hover:bg-accent-200 text-accent-700 border-r border-gray-300 dark:bg-gray-700 dark:text-accent-300 dark:border-gray-600 dark:hover:bg-gray-600"
          @click="() => togglePopover()"
        >
          <IconCalendar class="w-5 h-5" />
        </button>
        <input
          :value="inputValue"
          v-on="inputEvents"
          class="flex-grow px-2 py-1 bg-white dark:bg-gray-700"
        />
      </div>
    </template>
  </VDatePicker>
</template>

<script setup>
import { ref } from 'vue';

const date = ref(new Date());
</script>
