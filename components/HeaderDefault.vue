<template>
  <nav
    :class="['bg-secondary-400', 'shadow-inner', 'text-text-default', 'fixed', 'z-20', isFloating, 'left-0', 'right-0', 'mx-auto', 'transition-all duration-400 ease-in-out']">
    <div class="max-w-screen-xl flex flex-col sm:flex-row justify-between items-center px-4 py-3 mx-auto">
      <div class="flex items-center justify-between space-x-5 sm:space-x-10 md:space-x-20 lg:space-x-40">
        <nuxt-link to="/" class="text-text-default flex items-center space-x-3">
          <img class="w-5 h-5 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full" src="../public/logo-rounded.png" alt="Logo" />
          <div class="text-text-default lg:ml-2 font-bold text-sm md:text-base lg:text-xl xl:text-2xl">
            AutoLinkedIn
          </div>
        </nuxt-link>
        <div class="flex items-center">
          <input type="text" placeholder="Search"
            class="w-32 md:w-48 lg:w-64 xl:w-96 text-black px-4 py-2 border bg-white border-secondary-default rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-300" />
        </div>
        <button class="flex items-center sm:hidden" @click="developMenu">
          <FontAwesomeIcon :icon="faChevronDown" class="block" id="develop"/>
          <FontAwesomeIcon :icon="faChevronUp" class="hidden" id="hide" />
        </button>
      </div>
      <ul class="hidden sm:flex flex-row mx-auto items-center space-x-5 lg:space-x-10 text-2xl font-bold" id="navbar">
        <li>
          <nuxt-link to="/Login" class="text-text-default">
            <span v-if="$route.path === '/Login'">
              <FontAwesomeIcon :icon="faArrowRightToBracket" bounce />
            </span>
            <span v-else>
              <FontAwesomeIcon :icon="faArrowRightToBracket" />
            </span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="register/step1" class="text-text-default">
            <span v-if="$route.path === '/register/step1'">
              <FontAwesomeIcon :icon="faPenToSquare" bounce />
            </span>
            <span v-else>
              <FontAwesomeIcon :icon="faPenToSquare" />
            </span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="text-text-default">
            <FontAwesomeIcon :icon=faEnvelope />
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="text-text-default">
            <FontAwesomeIcon :icon=faBell />
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="text-text-default">
            <FontAwesomeIcon :icon=faIdCard />
          </nuxt-link>
        </li>
        <li>
          <button @click="toggleTheme" class="text-text-50">
            <FontAwesomeIcon :icon='isDarkTheme ? faMoon : faSun' />
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faMoon, faArrowRightToBracket, faPenToSquare, faEnvelope, faBell, faIdCard, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useCookie } from "#app";
import { onMounted, ref } from 'vue';

const isDarkTheme = useCookie("isDarkTheme", false);

const applyTheme = () => {
  if (isDarkTheme.value) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  applyTheme();
};

const isFloating = ref('w-full top-0');

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  const threshold = 50;
  if (window.scrollY > threshold) {
    isFloating.value = 'w-11/12 top-2 rounded-xl';
  } else {
    isFloating.value = 'w-full top-0';
  }
};


const developMenu = () => {
  const navbar = document.getElementById('navbar');
  const develop = document.getElementById('develop');
  const hide = document.getElementById('hide');
  if (navbar.classList.contains('hidden')) {
    navbar.classList.remove('hidden');
    navbar.classList.add('flex');
    develop.classList.remove('block');
    develop.classList.add('hidden');
    hide.classList.remove('hidden');
    hide.classList.add('block');
  } else {
    navbar.classList.remove('flex');
    navbar.classList.add('hidden');
    develop.classList.remove('hidden');
    develop.classList.add('block');
    hide.classList.remove('block');
    hide.classList.add('hidden');
  }
};
</script>
