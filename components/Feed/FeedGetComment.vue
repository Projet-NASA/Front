<!-- PostDetail.vue -->
<template>
  <div>
    <div class="p-4 bg-secondary-200 rounded shadow mb-4">
      <div class="flex items-center mb-2">
        <img
          class="w-10 h-10 rounded-full"
          :src="post.user.avatar || '../../public/logo-rounded.png'"
          alt="User avatar"
        />
        <div class="ml-2">
          <div class="text-text-default font-bold">
            {{ post.user.firstName }} {{ post.user.lastName }}
          </div>
          <div class="text-text-default text-sm text-gray-500">
            {{ timeSince(post.createdAt) }}
          </div>
        </div>
      </div>
      <div class="text-text-default mb-2">{{ post.message }}</div>
      <div class="comments-section">
        <div v-for="comment in post.comments" :key="comment.id" class="p-4 bg-secondary-200 rounded shadow mb-4">
          <div class="ml-2">
            <div class="text-text-default font-bold">
              {{ comment.userComment.firstName }} {{ comment.userComment.lastName }}
            </div>
            <div class="text-text-default text-sm text-gray-500">
              {{ timeSince(comment.createdAt) }}
            </div>
          </div>
          <div class="text-text-default mb-2">{{ comment.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Post } from '@/interfaces'
import { timeSince } from '@/helpers'

const route = useRoute()
const postId = ref(route.params.id)

const post = computed(() => {
  return posts.value.find(post => post.id === postId.value)
})
</script>
