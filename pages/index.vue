<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-2xl">
      <!-- Post Input -->
      <div class="p-4 bg-white rounded shadow mb-4">
        <input
          class="w-full p-2 border rounded"
          type="text"
          placeholder="Start a post..."
        />
        <div class="flex justify-between mt-2">
          <button class="px-4 py-2 bg-blue-600 text-white rounded">Post</button>
        </div>
      </div>

      <!-- Feed -->
      <div>
        <!-- Post -->
        <div class="p-4 bg-white rounded shadow mb-4">
          <div class="flex items-center mb-2">
            <img
              class="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/150"
              alt="User avatar"
            />
            <div class="ml-2">
              <div class="font-bold">User Name</div>
              <div class="text-sm text-gray-500">1h</div>
            </div>
          </div>
          <div class="mb-2">This is a post content.</div>
          <div class="flex justify-between text-gray-500 text-sm">
            <div>10 Likes</div>
            <div>2 Comments</div>
          </div>
        </div>
        <!-- More posts... -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Vue component options here...
};
</script>

<style scoped>
/* CSS styles here... */
</style>
