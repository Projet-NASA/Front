<template>
  <div class="flex flex-col items-center pt-7 bg-background-default">
    <div class="w-full max-w-2xl">
      <div class="p-4 bg-secondary-200 rounded shadow mb-4">
        <input
          class="w-full p-2 border rounded"
          type="text"
          placeholder="Start a post..."
        />
        <div class="flex justify-end mt-2">
          <button
            class="px-4 py-2 bg-primary-default text-text-default rounded"
          >
            Post
          </button>
        </div>
      </div>
      <div>
        <FeedPost />
        <FeedPost />
        <FeedPost />
        <FeedPost />
        <FeedPost />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* CSS styles here... */
</style>
