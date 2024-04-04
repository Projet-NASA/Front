<template>
  <div>
    <div
      v-for="post in reversedPosts"
      :key="post.id"
      class="p-4 bg-secondary-200 rounded shadow mb-4"
    >
      <div class="flex items-center mb-2">
        <img
          class="w-10 h-10 rounded-full"
          src="../../public/logo-rounded.png"
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
      <div class="flex justify-between items-center text-gray-500 text-sm">
        <button @click="likePost(post)">
          {{ post.like }}
          <span v-if="post.userliked.some(user => user.userId === userId)">
            <Icon
              name="material-symbols:favorite"
              class="text-primary-default"
            />
          </span>
          <span v-else>
            <Icon
              name="material-symbols:favorite-outline"
              class="hover:animate-ping hover:text-primary-default click:animate-ping click:text-primary-default"
            />
          </span>
        </button>
        <div>
          {{ post.comments.length }}
          <Icon
            name="material-symbols:chat"
            class="hover:animate-ping hover:text-primary-default click:animate-ping click:text-primary-default cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiURL from '../../utils/apiURLs'

interface User {
  id: string
  firstName: string
  lastName: string
  avatar?: string
}

interface Comment {
  id: string
  message: string
}

interface Post {
  id: string
  createdAt: string
  message: string
  like: number
  userliked: { userId: string }[]
  user: User
  comments: Comment[]
}
const userId = ref('')

const posts = ref<Post[]>([])

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

onMounted(() => {
  userId.value = localStorage.getItem('userId') || ''
  fetchPosts()
})

const reversedPosts = computed(() => [...posts.value].reverse())

const likePost = async (post: Post) => {
  const hasLiked = post.userliked.some(
    userLike => userLike.userId === userId.value
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
        userId: userId.value
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
