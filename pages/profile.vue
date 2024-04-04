<template>
  <div class="bg-background-default text-text-default flex flex-col items-center justify-between">
    <div v-if="user" class="w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
      <div class=" my-8 bg-background-200 shadow-md rounded pb-8">
        <div class="flex flex-col mb-8">
          <div class="flex flex-row-reverse">
            <img src="../assets/images/logo.png" class="w-full h-40 rounded" />
            <button
              class="bg-primary-default hover:bg-primary-400 text-white rounded-full h-10 w-10 mt-4 mr-4 absolute flex items-center justify-center transition-colors duration-300">
              <Icon name="material-symbols:edit" class="w-6 h-6" />
            </button>
          </div>
          <div class="mx-6">
            <div class="flex flex-row justify-between">
              <img src="../assets/images/logo.png"
                class="w-32 h-32 rounded-full -mt-20 border-primary-default border-4" />
              <Icon name="material-symbols:edit"
                class="w-10 h-10 mt-4 p-2 text-primary-default hover:bg-primary-400 hover:text-white rounded-full cursor-pointer transition-colors duration-300" />
            </div>
            <h1 class="text-3xl font-bold">{{ user.firstName }} {{ user.lastName }}</h1>
            <h2 class="text-lg">{{ user.email }}</h2>
            <h2 class="text-lg">{{ user.phone }}</h2>
            <p class="font-light"><span>{{ user.city }}</span>, <span>{{ user.country }}</span></p>
          </div>
        </div>
      </div>
      <div class=" mb-8 bg-background-200 shadow-md rounded py-8">
        <div class="flex flex-col mb-8">
          <div class="mx-6">
            <div class="mb-8">
              <h1 class="text-2xl font-bold">Experiences</h1>
              <div v-for="experience in user.experiences" :key="experience.id"
                class="mx-6 mt-4 border-t border-background-300 pt-4">
                <div class="flex flex-col justify-between">
                  <h2 class="text-lg">{{ experience.title }}</h2>
                  <div class="flex flex-row justify-between">
                    <h2 class="text-lg">{{ experience.company }}</h2>
                    <h2 class="text-lg">{{ formatDate(experience.from) }} - {{ formatDate(experience.to) }}</h2>
                  </div>
                </div>
                <p class="font-light">{{ experience.description }}</p>
              </div>
            </div>
            <div class="mb-8">
              <h1 class="text-2xl font-bold">Jobs</h1>
              <div v-for="job in user.jobs" :key="job.id" class="mx-6 mt-4 border-t border-background-300 pt-4">
                <div class="flex flex-col justify-between">
                  <h2 class="text-lg">{{ job.title }}</h2>
                  <div class="flex flex-row justify-between">
                    <h2 class="text-lg">{{ job.company }}</h2>
                    <h2 class="text-lg">{{ formatDate(job.from) }} - {{ formatDate(job.to) }}</h2>
                  </div>
                </div>
                <p class="font-light">{{ job.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          class="bg-red-500 hover:bg-red-800 text-white rounded p-2 mx-auto flex items-center justify-center transition-colors duration-300">
          Log out
          <Icon name="material-symbols:logout" class="w-6 h-6 ml-2" />
        </button>

      </div>
    </div>
    <div v-else class="w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
      <div class="my-8 bg-background-200 shadow-md rounded pb-8">
        <div class="flex flex-col mb-8">
          <div class="flex flex-row-reverse">
            <div class="w-full h-40 bg-background-300 animate-pulse rounded"></div>
          </div>
          <div class="mx-6">
            <div class="flex flex-row justify-between">
              <div class="w-32 h-32 bg-background-300 animate-pulse rounded-full -mt-20">
              </div>
              <div
                class="w-10 h-10 mt-4 p-2 text-primary-default hover:bg-primary-400 hover:text-white rounded-full cursor-pointer transition-colors duration-300 animate-pulse">
              </div>
            </div>
            <div class="h-6 bg-background-300 animate-pulse w-3/4 mt-4"></div>
            <div class="h-6 bg-background-300 animate-pulse w-1/2 mt-1"></div>
            <div class="h-6 bg-background-300 animate-pulse w-1/4 mt-1"></div>
          </div>
        </div>
      </div>
      <div class="mb-8 bg-background-200 shadow-md rounded py-8">
        <div class="flex flex-col mb-8">
          <div class="mx-6">
            <div class="mb-8">
              <div class="h-6 bg-background-300 animate-pulse w-1/4"></div>
              <div class="mx-6 mt-4 border-t border-background-300 pt-4">
                <div class="flex flex-col justify-between">
                  <div class="h-6 bg-background-300 animate-pulse w-1/2"></div>
                  <div class="h-6 bg-background-300 animate-pulse w-1/4 mt-1"></div>
                </div>
                <div class="h-6 bg-background-300 animate-pulse w-3/4 mt-1"></div>
              </div>
            </div>
            <div class="mb-8">
              <div class="h-6 bg-background-300 animate-pulse w-1/4"></div>
              <div class="mx-6 mt-4 border-t border-background-300 pt-4">
                <div class="flex flex-col justify-between">
                  <div class="h-6 bg-background-300 animate-pulse w-1/2"></div>
                  <div class="h-6 bg-background-300 animate-pulse w-1/4 mt-1"></div>
                </div>
                <div class="h-6 bg-background-300 animate-pulse w-3/4 mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <svg class="w-20 h-20 mx-auto my-auto text-primary-default animate-spin" xmlns="http://www.w3.org/2000/svg"
          version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
            <path
              d="M2380 4794 c-197 -23 -303 -43 -450 -86 -723 -208 -1310 -795 -1518 -1518 -67 -232 -86 -372 -86 -630 0 -258 19 -398 86 -630 216 -751 836 -1349 1595 -1539 209 -52 317 -65 548 -65 227 -1 355 14 540 60 798 200 1423 816 1629 1604 56 214 71 335 70 575 0 237 -13 346 -70 563 -201 775 -818 1395 -1589 1596 -182 48 -326 67 -530 71 -104 2 -206 1 -225 -1z m512 -593 c524 -113 952 -449 1178 -923 81 -169 162 -455 138 -485 -16 -20 -100 -43 -160 -43 -66 0 -38 -10 -498 178 -190 77 -385 152 -434 167 -365 105 -747 105 -1112 -1 -49 -14 -260 -95 -469 -181 -326 -134 -389 -157 -445 -161 -73 -4 -138 9 -168 36 -20 17 -20 17 -1 108 115 554 511 1021 1038 1225 101 39 238 76 347 94 133 21 457 14 586 -14z m-214 -1547 c92 -46 145 -131 146 -234 1 -106 -51 -192 -148 -243 -58 -30 -174 -31 -231 0 -54 28 -119 100 -136 149 -45 134 28 293 157 339 65 23 152 19 212 -11z m-953 -643 c239 -81 405 -306 405 -552 0 -41 -10 -170 -22 -287 l-22 -213 -30 7 c-17 3 -64 19 -104 35 -327 130 -605 357 -796 651 -57 87 -152 275 -158 313 -3 21 -20 18 392 69 143 18 232 12 335 -23z m2185 0 c200 -25 215 -28 212 -46 -6 -42 -135 -285 -199 -375 -87 -122 -272 -307 -390 -390 -147 -103 -365 -212 -469 -234 l-30 -7 -22 213 c-12 117 -22 246 -22 287 0 237 158 461 386 547 132 49 178 50 534 5z" />
          </g>
        </svg>
      </div>


    </div>
  </div>
</template>

<script>
import apiURL from '../utils/apiURLs'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPen
} from '@fortawesome/free-solid-svg-icons'

export default {
  data() {
    return {
      formatDate: (date) => {
        return new Date(date).toLocaleDateString();
      }
    }
  },
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
      }
      try {
        const response = await fetch(`http://localhost:3003/user/OneUser/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Impossible de récupérer les données de l'utilisateur");
        }

        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error(error.message);
      }
    }
  }
}
</script>
