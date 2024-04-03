<template>
  <div class="pt-16 bg-background-default h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'

defineComponent({
  head() {
    return {
      title: 'AutoLinkedIn'
    }
  }
})
</script>
