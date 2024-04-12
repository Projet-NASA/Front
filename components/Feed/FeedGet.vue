<template>
  <div>
    <div
      v-for="post in reversedPosts"
      :key="post.id"
      class="p-4 bg-secondary-200 rounded shadow mb-4"
    >
      <div class="flex">
        <NuxtLink
          :to="`/profile/${post.user.id}`"
          class="flex items-center mb-2"
        >
          <img
            class="w-10 h-10 rounded-full hover:outline hover:outline-primary-default hover:outline-offset-2 click:outline click:outline-primary-default click:outline-offset-2"
            src="../../public/logo-rounded.png"
            alt="User avatar"
          />
        </NuxtLink>
        <div class="ml-2">
          <NuxtLink
            :to="`/profile/${post.user.id}`"
            class="flex items-center text-text-default hover:text-primary-default hover:underline click:text-primary-default click:underline"
          >
            <div class="font-bold">
              {{ post.user.firstName }} {{ post.user.lastName }}
            </div>
          </NuxtLink>
          <div class="text-text-default text-sm text-gray-500">
            {{ timeSince(post.createdAt) }}
          </div>
        </div>
      </div>
      <div class="text-text-default mb-2">{{ post.message }}</div>
      <div class="flex justify-between items-center text-gray-500">
        <button @click="likePost(post)" class="text-sm">
          {{ post.like }}
          <span
            v-if="post.userliked.some((user: User) => user.userId === userId)"
          >
            <Icon
              name="material-symbols:favorite"
              class="text-primary-default text-2xl hover:animate-ping click:animate-ping"
            />
          </span>
          <span v-else>
            <Icon
              name="material-symbols:favorite-outline"
              class="hover:animate-ping hover:text-primary-default click:animate-ping click:text-primary-default text-2xl"
            />
          </span>
        </button>
        <button @click="selectPost(post.id)">
          {{ post.comments.length }}
          <Icon
            name="material-symbols:chat"
            class="hover:animate-ping hover:text-primary-default click:animate-ping click:text-primary-default cursor-pointer text-2xl"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiURL from '../../utils/apiURLs'
import type { Post } from '../../.nuxt/types/post.interface'
import type { User } from '../../.nuxt/types/user.interface'
import { useRouter } from 'vue-router'
import { useFormStore } from '../../stores/comment'

const formStore = useFormStore()
const formData = formStore.formData

const posts = ref<Post[]>([])

const router = useRouter()
let userId = ref('')
const fetchPosts = async () => {
  try {
    const response = await fetch(apiURL.getPost)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    posts.value = await response.json()
  } catch (error) {
    console.error(error)
  }
}

let intervalId: number | undefined

onMounted(() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const sessionId = window.localStorage.getItem('sessionId')
    if (!sessionId) {
      router.push('/login')
    }
    fetchPosts()
  }
})
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
const reversedPosts = computed(() => [...posts.value].reverse())

const likePost = async (post: Post) => {
  const hasLiked = post.userliked.some(
    (userLike: User) => userLike.userId === userId
  )

  if (hasLiked) {
    console.log('Removing like from this post')
    await removeLikeFromPost(post)
  } else {
    console.log('Adding like to this post')
    await addLikeToPost(post)
  }

  await fetchPosts()
}

const addLikeToPost = async (post: Post) => {
  try {
    const response = await fetch(apiURL.addLike, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: post.id,
        userId: userId
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to like post`)
    }

    console.log('Post liked successfully')
    await fetchPosts()
  } catch (error) {
    console.error(error)
  }
}

const removeLikeFromPost = async (post: Post) => {
  try {
    const findLikeResponse = await fetch(
      `http://localhost:3003/like/findLikeByPostAndUserId/${post.id}/${userId.value}`
    )
    if (!findLikeResponse.ok) {
      throw new Error('Failed to find like for removal')
    }
    const like = await findLikeResponse.json()

    const removeLikeResponse = await fetch(
      `http://localhost:3003/like/Like/${like.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (!removeLikeResponse.ok) {
      throw new Error('Failed to remove like')
    }

    console.log('Like removed successfully')
    await fetchPosts()
  } catch (error) {
    console.error(error)
  }
}

const selectPost = (postId: string) => {
  formData.postId = postId
  router.push(`/postComment/${postId}`)
}

const timeSince = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  )
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years'
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months'
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days'
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours'
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes'
  return Math.floor(seconds) + ' seconds'
}
</script>
