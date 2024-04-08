<template>
  <div
    id="addPopup"
    class="flex justify-center"
  >
    <form id="createPost" class="w-full">
      <textarea
        type="text"
        id="postContent"
        class="w-full h-full bg-background-default outline-none text-text-default p-5 border rounded-lg border-accent-default"
        placeholder="Enter your post here..."
        v-model="postContent"
      ></textarea>
      <div class="flex justify-end">
        <button
          type="submit"
          id="createPost"
          class="bg-primary-300 px-2 py-1 rounded-lg text-text-default hover:bg-primary-default hover:text-text-50 transition-colors duration-300 focus:outline-none focus:shadow-outline"
          @click.prevent="createPost"
        >
          POST
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import apiURL from '../../utils/apiURLs'

const postContent = ref('')
const emits = defineEmits(['update'])

const createPost = async () => {
  console.log('Creating post:', postContent.value)
  if (postContent.value != '') {
    console.log(apiURL.addPost)
    try {
      const response = await fetch(apiURL.addPost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: postContent.value,
          userId: localStorage.getItem('userId')
        })
      })

      console.log()
      if (!response.ok) {
        throw new Error(`Failed to create post`)
      }
      location.reload();
      const data = await response.json()
      console.log('Created post:', data)

      postContent.value = ''

      emits('update', false)
    } catch (error) {
      console.error(error)
      const errorMessage = ref('')

      errorMessage.value = 'Failed to create post'
    }
  }
}
</script>

<style scoped></style>
