<template>
  <div>
    <button @click="openPopup">Open Popup</button>
    <div v-if="showPopup" class="popup">
      <!-- Popup content goes here -->
      <h2>Popup Window</h2>
      <p>This is a popup window.</p>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showPopup = ref(false)

function openPopup() {
  showPopup.value = true
}

function closePopup() {
  showPopup.value = false
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid black;
}
</style>
