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
          <div class="text-text-default font-bold">User Name</div>
          <div class="text-text-default text-sm text-gray-500">{{ timeSince(post.createdAt) }}</div>
        </div>
      </div>
      <div class="text-text-default mb-2">{{ post.message }}</div>
      <div class="flex justify-between text-gray-500 text-sm">
        <button @click="likePost(post)">{{post.like}} Like</button>
        <button>0 Comments</button>
      </div>
      <FeedComment/>
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
import { ref, onMounted, onUnmounted } from 'vue'
import apiURL from '../../utils/apiURLs'

const userId = '660c0462b7a076125a0dfd08'

interface Post {
  id: string;
  createdAt: string;
  message: string;
  like: number;
  userliked: { userId: string }[];
}

interface Comment {
  id: string;
  createdAt: string;
  message: string;
  postId: string;
}


const comments = ref<Comment[]>([])


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

// const invisible = async (id) =>{
//   if (document.getElementById(id).style.display == 'none')
//   {
//        document.getElementById(id).style.display = 'block';
//   }
//   else
//   {
//        document.getElementById(id).style.display = 'none';
//   }
// }

let intervalId: number | undefined

onMounted(() => {
  fetchPosts()
  fetchComments()
  intervalId = window.setInterval(fetchPosts, 2000)
  intervalId = window.setInterval(fetchComments, 2000)
})

onUnmounted(() => {
  if (intervalId) {
    window.clearInterval(intervalId)
  }
})
const reversedPosts = computed(() => [...posts.value].reverse())
const reversedcomments = computed(() => [...comments.value].reverse())


// update posts for likes

const likePost = async (post: Post) => {
  try {
    // Check if the user has already liked the post
    if (post.userliked.some(user => user.userId === userId)) {
      console.log('User has already liked this post')
      return
    }

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

    const data = await response.json()
    console.log('Liked post:', data)
    fetchPosts()
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
  return comments.value.filter(comment => comment.postId === postId)
}

const timeSince = (date: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  
  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + " years"
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + " months"
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + " days"
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + " hours"
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + " minutes"
  }
  return Math.floor(seconds) + " seconds"
}

</script>