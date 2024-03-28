<template>
  <nav
    :class="['bg-secondary-400', 'shadow-inner', 'text-text-default', 'fixed', 'z-20', isFloating, 'left-0', 'right-0', 'mx-auto', 'transition-all duration-400 ease-in-out']">
    <div class="max-w-screen-xl flex flex-wrap justify-between items-center px-4 py-3 mx-auto space-y-3 md:space-y-0">
      <nuxt-link to="/" class="text-text-default flex items-center space-x-3">
        <img class="w-auto h-10 rounded-full" src="../public/logo-rounded.png" alt="Logo" />
        <div class="text-text-default ml-2 font-bold text-xl">
          AutoLinkedIn
        </div>
      </nuxt-link>
      <div class="flex items-center">
        <input type="text" placeholder="Search"
          class="text-black px-4 py-2 border bg-white border-secondary-default rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-300" />
      </div>
      <ul class="flex flex-row items-center space-x-10 text-2xl font-bold">
        <li>
          <nuxt-link to="login" class="text-text-default">
            <span v-if="$route.path === '/login'">
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
          <button @click="toggleTheme" class="text-text-default">
            <FontAwesomeIcon :icon='isDarkTheme ? faSun : faMoon' />
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faMoon, faArrowRightToBracket, faPenToSquare, faEnvelope, faBell, faIdCard } from '@fortawesome/free-solid-svg-icons'
import { useCookie } from "#app";
import { onMounted, ref } from 'vue';

const isDarkTheme = useCookie("isDarkTheme", false);

const applyTheme = () => {
  if (isDarkTheme.value) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}


const handleScroll = () => {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop
  isScrollingDown.value = currentScrollPosition > 0
}


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


  applyTheme() // Applique le thème lors du montage du composant
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>
