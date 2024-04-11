<template>
  <div :key="String(postId)" class="p-4 bg-secondary-200 rounded shadow mb-4 w-full max-w-5xl mx-auto">
    <div class="flex">
      <NuxtLink :to="`/profile/${posts.user}`" class="flex items-center mb-2">
        <img
          class="w-10 h-10 rounded-full hover:outline hover:outline-primary-default hover:outline-offset-2 click:outline click:outline-primary-default click:outline-offset-2"
          src="../../public/logo-rounded.png" alt="User avatar" />
      </NuxtLink>
      <div class="ml-2">
        <NuxtLink :to="`/profile/${posts.user}`"
          class="flex items-center text-text-default hover:text-primary-default hover:underline click:text-primary-default click:underline">
          <div v-if="posts.user" class=" font-bold">
            {{ posts.user.firstName }} {{ posts.user.lastName }}
          </div>
        </NuxtLink>
        <div class="text-text-default text-sm text-gray-500">
          {{ timeSince(posts.createdAt) }}
        </div>
      </div>
    </div>
    <div class="text-text-default mb-2">{{ posts.message }}</div>
    <div v-if="posts" class="flex justify-between items-center text-gray-500 text-sm">
      <button @click="likePost(posts)">
        {{ posts.like }}
        <span v-if="posts.userliked && posts.userliked.some(user => user.userId === userId)">
          <Icon name="material-symbols:favorite" class="text-primary-default text-2xl" />
        </span>
        <span v-else>
          <Icon name="material-symbols:favorite-outline"
            class="hover:animate-ping hover:text-primary-default click:animate-ping click:text-primary-default text-2xl" />
        </span>
      </button>
    </div>
    <FeedComment :postId="`${posts.id}`" />
    <div v-if="postComments(posts.id).length > 0" class="max-h-[550px] overflow-y-auto mx-auto mt-4">
      <div v-for="comment in postComments(posts.id)" :key="comment.id" class="p-4 bg-secondary-300 rounded shadow mb-4">
        <div class="flex">
            <NuxtLink :to="`/profile/${comment}`" class="flex items-center mb-2">
            <img
              class="w-10 h-10 rounded-full hover:outline hover:outline-primary-default hover:outline-offset-2 click:outline click:outline-primary-default click:outline-offset-2"
              src="../../public/logo-rounded.png" alt="User avatar" />
          </NuxtLink>
          <div class="ml-2">
            <NuxtLink :to="`/profile/${comment}`"
              class="flex items-center text-text-default hover:text-primary-default hover:underline click:text-primary-default click:underline">
              <div class=" font-bold">
                  {{ comment.user.firstName }} {{ comment.user.lastName }}
              </div>
            </NuxtLink>
            <div class="text-text-default text-sm text-gray-500">
              {{ timeSince(comment.createdAt) }}
            </div>
            <div class="text-text-default">{{ comment.message }}</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiURL from '../../utils/apiURLs'
import { useRouter } from 'vue-router'
import type { Post } from '../../components/interfaces/post.interface.ts'
import type { User } from '../../components/interfaces/user.interface.ts'
import type { Comment } from '../../components/interfaces/comment.interface'
import { useFormStore } from '../../stores/comment'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { comment } from 'postcss'
import { checkTokenAndRedirect } from '../../utils/utils'

const route = useRoute();
const postId = route.params.postId;
const formStore = useFormStore()
const formData = formStore.formData

let selectedPost = ref(false)

const userId = ref('')

const user = ref<User>({} as User)

const comments = ref<Comment[]>([])

const posts = ref<Post>({} as Post)


if (postId) {
  selectedPost.value = true;
  console.log(selectedPost)
}

console.log(postId)

const fetchPost = async () => {
  try {

    const response = await fetch(
      `http://localhost:3003/post/PostbyId/${postId}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch post details')
    }
    posts.value = await response.json()
    console.log(posts.value.message)
    console.log(posts.value.user.firstName)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  checkTokenAndRedirect()
  fetchComments()
  fetchPost()
  fetchUserInfo()
})

const reversedcomments = computed(() => [...comments.value].reverse())

const postComments = (postId: string) => {
  return comments.value.filter(
    (comment: { postId: string }) => comment.postId === postId
  )
}

const fetchComments = async () => {
  try {
    const response = await fetch(`http://localhost:3003/comment/CommentByPostId/${postId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }

    comments.value = await response.json()
    console.log(comments.value)
  } catch (error) {
    console.error(error)
  }
}

const fetchUserInfo = async () => {
  try {
    const response = await fetch(`http://localhost:3003/user/OneUser/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user details')
    }
    user.value = await response.json()
    console.log("user", user.value)
  } catch (error) {
    console.error(error)
    return null;
  }
}


const likePost = async (post: Post) => {
  const hasLiked = post.userliked.some(
    (userLike: { userId: any }) => userLike.userId === userId.value
  )

  if (hasLiked) {
    console.log('Removing like from this post')
    await removeLikeFromPost(post)
  } else {
    console.log('Adding like to this post')
    await addLikeToPost(post)
  }

  await fetchPost()
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
    await fetchPost()
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
    await fetchPost()
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
