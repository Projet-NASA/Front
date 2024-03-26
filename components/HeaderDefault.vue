<template>
  <div>
    <head>
      <title>AutoLinkedIn</title>
    </head>
    <header
      :class="{
        'fixed w-11/12 ml-20 mt-2 rounded-2xl': isScrollingDown,
        'bg-secondary-100 text-black shadow-lg z-50': true,
      }"
    >
      <div
        class="container mx-auto flex flex-row items-center justify-between p-4"
      >
        <div class="flex items-center">
          <img
            class="w-auto h-10 rounded-full"
            src="../public/logo-rounded.png"
            alt="Logo"
          />
          <div class="text-text-default ml-2 font-bold text-xl">
            AutoLinkedIn
          </div>
        </div>
        <div>
          <input class="p-2 rounded" type="text" placeholder="Search..." />
        </div>
        <nav>
          <ul class="flex flex-row space-x-4">
            <li>
              <nuxt-link to="/" class="text-text-default">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="text-text-default">My Network</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="text-text-default">Jobs</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="text-text-default">Messaging</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="text-text-default"
                >Notifications</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/" class="text-text-default">Me</nuxt-link>
            </li>
          </ul>
          <div>
            <button @click="toggleTheme" class="text-text-default">
              Switch to {{ isDarkTheme ? "Light" : "Dark" }} Theme
            </button>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCookie } from "#app";

const isScrollingDown = ref(false);
const isDarkTheme = useCookie("isDarkTheme", false);

const applyTheme = () => {
  if (isDarkTheme.value) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

const handleScroll = () => {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  isScrollingDown.value = currentScrollPosition > 0;
};

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  applyTheme();
};

onMounted(() => {
  applyTheme(); // Applique le thème lors du montage du composant
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
