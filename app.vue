<template>
  <div>
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
