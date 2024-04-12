<template>
  <div>
    <form id="createComment" class="w-full">
      <textarea
        type="text"
        id="commentContent"
        class="w-full bg-background-default outline-none text-text-default rounded-lg p-2 my-2"
        placeholder="Ajouter un commentaire"
        v-model="commentContent"
      ></textarea>
      <div class="flex justify-end">
        <button
          type="submit"
          id="createComment"
          class="bg-primary-200 px-2 py-1 rounded-lg text-text-default hover:bg-primary-default hover:text-text-50 transition-colors duration-300 focus:outline-none focus:shadow-outline"
          @click.prevent="createComment"
        >
          Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
import apiURL from '../../utils/apiURLs'

const commentContent = ref('')
const emits = defineEmits(['update'])

const props = defineProps({
  postId: String
})
let userId = ref('')
let sessionId
if (typeof window !== 'undefined' && window.localStorage) {
  sessionId = window.localStorage.getItem('sessionId')
}

if (sessionId) {
  const userIdResponse = await fetch(
    `http://localhost:3003/user/getUserIdFromSession/${sessionId}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  const responseData = await userIdResponse.json()
  userId = responseData.userId
}

const createComment = async () => {
  console.log('Creating comment:', commentContent.value)
  if (commentContent.value != '') {
    try {
      const response = await fetch(apiURL.addComment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: commentContent.value,
          userId: userId,
          postId: props.postId
        })
      })

      console.log(props.postId)

      if (!response.ok) {
        throw new Error(`Failed to create comment`)
      }

      const data = await response.json()
      console.log('Created comment:', data)

      commentContent.value = ''

      emits('update', false)
      reloadNuxtApp()
    } catch (error) {
      console.error(error)
      // Gérer les erreurs ici
    }
  }
}
</script>
