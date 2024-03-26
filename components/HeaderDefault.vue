<template>
  <div>
    <head>
      <title>AutoLinkedIn</title>
    </head>
    <header class="bg-white text-black shadow-lg">
      <div
        class="container mx-auto flex flex-row items-center justify-between p-4"
      >
        <div class="flex items-center">
          <img
            class="w-10 h-10 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Logo"
          />
          <div class="ml-2 font-bold text-xl">AutoLinkedIn</div>
        </div>
        <div>
          <input class="p-2 rounded" type="text" placeholder="Search..." />
        </div>
        <nav>
          <ul class="flex flex-row space-x-4">
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><nuxt-link to="/network">My Network</nuxt-link></li>
            <li><nuxt-link to="/jobs">Jobs</nuxt-link></li>
            <li><nuxt-link to="/messaging">Messaging</nuxt-link></li>
            <li><nuxt-link to="/notifications">Notifications</nuxt-link></li>
            <li><nuxt-link to="/profile">Me</nuxt-link></li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
let isLoggedIn = false;
if (!isLoggedIn) {
  // this.$router.push('/register/step1');
}
</script>

<style lang="scss" scoped></style>
