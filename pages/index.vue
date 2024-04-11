<template>
  <div class="flex flex-col items-center pt-7 bg-background-default">
    <div class="w-full max-w-5xl">
      <div class="p-4 bg-secondary-200 rounded shadow mb-4">
        <div v-if="postField == false">
          <button
            class="w-full p-2 border rounded text-left text-text-900 bg-background-default hover:outline-primary-default hover:outline hover:shadow-outline"
            type="button"
            @click="postField = true"
          >
            Start a post
          </button>
        </div>
        <div v-else-if="postField == true">
          <FeedPost :postField="postField" @update="postField = $event" />
        </div>
        <div class="flex justify-end mt-2">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <div>
        <FeedGet />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const postField = ref(false)
</script>

<style scoped></style>
