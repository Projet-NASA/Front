<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'
const supabase = createClient(
  'https://tglkequqoqcgnlqhcvuh.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnbGtlcXVxb3FjZ25scWhjdnVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMTc4OTcsImV4cCI6MjAyNzc5Mzg5N30.1_8MOy5RQUhDkNTdbhG8KWDqCQ7OiNFBuB7JnLYCQIg'
)

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.error('Error:', error.message)
  } else {
    console.log('User:', data.user)
    console.log('Session:', data.session)
  }
}

const logIn = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.error('Error:', error.message)
  } else {
    console.log('User:', data.user)
  }
}

const email = ref('')
const password = ref('')
const isSignUp = ref(false)
</script>

<template>
  <div>
    <div class="flex justify-center items-center h-screen">
      <div class="w-96">
        <div class="flex justify-between">
          <button
            class="w-1/2 py-2 bg-blue-500 text-white"
            @click="isSignUp = false"
          >
            Log In
          </button>
          <button
            class="w-1/2 py-2 bg-blue-500 text-white"
            @click="isSignUp = true"
          >
            Sign Up
          </button>
        </div>
        <input
          v-model="email"
          class="w-full mt-4 p-2 border border-gray-300"
          type="email"
          placeholder="Email"
        />
        <input
          v-model="password"
          class="w-full mt-4 p-2 border border-gray-300"
          type="password"
          placeholder="Password"
        />
        <button
          class="w-full mt-4 py-2 bg-blue-500 text-white"
          @click="isSignUp ? signUp() : logIn()"
        >
          {{ isSignUp ? 'Sign Up' : 'Log In' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
