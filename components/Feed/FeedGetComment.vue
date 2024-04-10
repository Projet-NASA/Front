<!-- <template>
  <div>
    <div
      v-for="post in reversedPosts"
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
            <Icon name="material-symbols:favorite" class="text-primary-default text-lg" />
          </span>
          <span v-else>
            <Icon name="material-symbols:favorite-outline"
              class="hover:animate-ping hover:text-primary-default click:animate-ping click:text-primary-default text-lg" />
          </span>
        </button>
        <button>
          {{ post.comments.length }}
          <Icon name="material-symbols:chat"
            class="hover:animate-ping hover:text-primary-default click:animate-ping click:text-primary-default cursor-pointer text-lg" />
        </button>
      </div>
      <FeedComment :postId="`${post.id}`" />
      <div v-if="postComments(post.id).length > 0" class="comments-section">
        <div
          v-for="comment in postComments(post.id)"
          :key="comment.id"
          class="p-4 bg-secondary-200 rounded shadow mb-4"
        >
          <div class="text-text-default mb-2">{{ comment.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiURL from '../../utils/apiURLs'
import type { Post } from '../../.nuxt/types/post.interface'
import type { User } from '../../.nuxt/types/user.interface'
import type { Comment } from '../../.nuxt/types/comment.interface'

const userId = ref('')

const comments = ref<Comment[]>([])

const posts = ref<Post[]>([])

const fetchPost = async () => {
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
  userId.value = localStorage.getItem('userId') || ''
  fetchPost()
  fetchComments()
  intervalId = window.setInterval(fetchPosts, 2000)
  intervalId = window.setInterval(fetchComments, 2000)
})

const reversedPosts = computed(() => [...posts.value].reverse())
const reversedcomments = computed(() => [...comments.value].reverse())

// update posts for likes

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

const fetchComments = async () => {
  try {
    const response = await fetch(apiURL.getComment)

    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }

    comments.value = await response.json()
  } catch (error) {
    console.error(error)
  }
}

const postComments = (postId: string) => {
  return comments.value.filter(
    (comment: { postId: string }) => comment.postId === postId
  )
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
</script> -->

<template>
  <div :key="formData.postId">
    <h2>
      {{ posts.id }}
      {{ posts.user.firstName }}
    </h2>
    <p>
      {{ posts.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiURL from '../../utils/apiURLs'
import { useRouter } from 'vue-router'
import type { Post } from '../interfaces/post.interface.ts'
import type { User } from '../interfaces/user.interface.ts'
import { useFormStore } from '../../stores/comment'

const formStore = useFormStore()
const formData = formStore.formData

let selectedPost = ref(false)

const userId = ref('')

const comments = ref<Comment[]>([])

const posts = ref<Post>([])
 

const router = useRouter()

if (formData.postId) {
  selectedPost = true
  console.log(selectedPost)
}

console.log(formData.postId);


const RetrievedId = formData.postId
const fetchPost = async () => {
  try {
    console.log(RetrievedId);
    
    const response = await fetch(
      `http://localhost:3003/post/PostbyId/${ RetrievedId }`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch post details')
    }
    posts.value = await response.json()
    console.log(posts.value.message)
    console.log(posts.value.user.firstName);
    
  } catch (error) {
    console.error(error)
  }
}



onMounted(() => {
  userId.value = localStorage.getItem('userId') || ''
  fetchPost()
})


</script>
