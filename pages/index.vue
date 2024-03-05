<template>
  <div>
    <button @click="redirectToForm">Aller au formulaire</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function redirectToForm() {
  router.push('/form');
}
</script>
