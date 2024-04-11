<template>
  <div class="bg-background-default text-text-default flex flex-col items-center justify-between">
    <div v-if="user" class="w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
      <div class="my-8 bg-secondary-200 shadow-md rounded pb-8">
        <div class="flex flex-col mb-8">
          <div class="flex flex-row-reverse">
            <img src="../../assets/images/sacha_wide.png" class="w-full h-40 rounded" />
            <button v-if="visitorId === user.id"
              class="bg-primary-default hover:bg-primary-400 text-white rounded-full h-10 w-10 mt-4 mr-4 absolute flex items-center justify-center transition-colors duration-300">
              <Icon name="material-symbols:edit" class="w-6 h-6" />
            </button>
          </div>
          <div class="mx-6">
            <div class="flex flex-row justify-between">
              <img src="../../assets/images/logo.png"
                class="w-32 h-32 rounded-full -mt-20 border-primary-default border-4" />
              <button v-if="visitorId === user.id">
                <Icon name="material-symbols:edit"
                  class="w-10 h-10 mt-4 p-2 text-primary-default hover:bg-primary-400 hover:text-white rounded-full cursor-pointer transition-colors duration-300" />
              </button>
            </div>
            <h1 class="text-3xl font-bold">
              {{ user.firstName }} {{ user.lastName }}
            </h1>
            <h2 class="text-lg">{{ user.email }}</h2>
            <h2 class="text-lg">{{ user.phone }}</h2>
            <p class="font-light">
              <span>{{ user.city }}</span>, <span>{{ user.country }}</span>
            </p>
            <div v-if="visitorId != user.id">
              <button @click="followUser()"
                class="bg-primary-default hover:bg-primary-400 text-white text-lg rounded-lg h-10 p-5 mt-2 flex items-center justify-center transition-colors duration-300">
                <Icon name="material-symbols:group-add" class="w-6 h-6 mr-2" />Follow
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-8 bg-secondary-200 shadow-md rounded py-8">
        <div class="flex flex-col mb-8">
          <div class="mx-6">
            <div class="mb-8">
              <h1 class="text-2xl font-bold flex">
                Experiences
                <button v-if="visitorId === user.id" @click="showExperienceForm = true"
                  class="ml-2 hover:bg-primary-400 rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-300">
                  <Icon name="material-symbols:add" class="w-6 h-6" />
                </button>
              </h1>
              <div v-if="showExperienceForm"
                class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center pb-full">
                <ProfileExperiencesForm :class="showExperienceForm ? 'block' : 'hidden'" />
                <button @click="showExperienceForm = false"
                  class="absolute top-2 left-2 sm:top-10 sm:left-24 md:left-40 md:top-10 lg:left-1/4 z-50 ml-2 hover:bg-primary-400 rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-300">
                  <Icon name="material-symbols:close" class="w-6 h-6" />
                </button>
              </div>
              <div class="flex flex-wrap max-h-80 overflow-y-auto bg-secondary-300 rounded-xl">
                <div v-for="experience in experiences" :key="experience.id">
                  <ProfileExperience :user="user" :visitorId="visitorId" :experience="experience" />
                </div>
              </div>
            </div>
            <div class="mb-8">
              <h1 class="text-2xl font-bold flex">
                Jobs
                <button v-if="visitorId === user.id" @click="showJobForm = true"
                  class="ml-2 hover:bg-primary-400 rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-300">
                  <Icon name="material-symbols:add" class="w-6 h-6" />
                </button>
              </h1>
              <div v-if="showJobForm"
                class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <ProfileJobsForm :class="showJobForm ? 'block' : 'hidden'" />
                <button @click="showJobForm = false"
                  class="absolute top-2 left-2 sm:top-10 sm:left-24 md:left-40 md:top-10 lg:left-1/4 z-50 ml-2 hover:bg-primary-400 rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-300">
                  <Icon name="material-symbols:close" class="w-6 h-6" />
                </button>
              </div>
              <div class="flex flex-wrap max-h-80 overflow-y-auto bg-secondary-300 rounded-xl">
                <div v-for="job in jobs" :key="job.id">
                  <ProfileJobs :user="user" :visitorId="visitorId" :job="job" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button v-if="visitorId === user.id" @click="logout()"
          class="bg-red-500 hover:bg-red-800 text-white rounded p-2 mx-auto flex items-center justify-center transition-colors duration-300">
          Log out
          <Icon name="material-symbols:logout" class="w-6 h-6 ml-2" />
        </button>
      </div>
    </div>
    <div v-else class="w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4">
      <div class="my-8 bg-secondary-200 shadow-md rounded pb-8">
        <div class="flex flex-col mb-8">
          <div class="flex flex-row-reverse">
            <div class="w-full h-40 bg-secondary-300 animate-pulse rounded"></div>
          </div>
          <div class="mx-6">
            <div class="flex flex-row justify-between">
              <div class="w-32 h-32 bg-secondary-300 animate-pulse rounded-full -mt-20"></div>
              <div
                class="w-10 h-10 mt-4 p-2 text-primary-default hover:bg-primary-400 hover:text-white rounded-full cursor-pointer transition-colors duration-300 animate-pulse">
              </div>
            </div>
            <div class="h-6 bg-secondary-300 animate-pulse w-3/4 mt-4"></div>
            <div class="h-6 bg-secondary-300 animate-pulse w-1/2 mt-1"></div>
            <div class="h-6 bg-secondary-300 animate-pulse w-1/4 mt-1"></div>
          </div>
        </div>
      </div>
      <div class="mb-8 bg-secondary-200 shadow-md rounded py-8">
        <div class="flex flex-col mb-8">
          <div class="mx-6">
            <div class="mb-8">
              <div class="h-6 bg-secondary-300 animate-pulse w-1/4"></div>
              <div class="mx-6 mt-4 border-t border-secondary-300 pt-4">
                <div class="flex flex-col justify-between">
                  <div class="h-6 bg-secondary-300 animate-pulse w-1/2"></div>
                  <div class="h-6 bg-secondary-300 animate-pulse w-1/4 mt-1"></div>
                  <div class="h-6 bg-secondary-300 animate-pulse w-1/4 mt-1"></div>
                  <div class="h-6 bg-secondary-300 animate-pulse w-1/4 mt-1"></div>
                </div>
                <div class="h-6 bg-secondary-300 animate-pulse w-3/4 mt-1"></div>
              </div>
            </div>
            <div class="mb-8">
              <div class="h-6 bg-secondary-300 animate-pulse w-1/4"></div>
              <div class="mx-6 mt-4 border-t border-secondary-300 pt-4">
                <div class="flex flex-col justify-between">
                  <div class="h-6 bg-secondary-300 animate-pulse w-1/2"></div>
                  <div class="h-6 bg-secondary-300 animate-pulse w-1/4 mt-1"></div>
                  <div class="h-6 bg-secondary-300 animate-pulse w-1/4 mt-1"></div>
                  <div class="h-6 bg-secondary-300 animate-pulse w-1/4 mt-1"></div>
                </div>
                <div class="h-6 bg-secondary-300 animate-pulse w-3/4 mt-1"></div>
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
export default {
  data() {
    return {
      user: null,
      error: null,
      showExperienceForm: false,
      showJobForm: false,
      jobs: null,
      experiences: null,
      visitorId: null
    }
  },
  async mounted() {
    this.checkTokenAndRedirect()
    try {
      const sessionId = localStorage.getItem('sessionId')
      const router = useRouter()
      const userId = router.currentRoute.value.params.profile
      if (!sessionId) {
        router.push('/login')
        throw new Error('Vous devez être connecté pour accéder à cette page')
      }
      console.log('User ID:', userId)
      console.log('Session ID:', sessionId)
      await this.getUserData(userId)
      await this.getVisitorData(sessionId)
      await this.getExperiences(userId)
      await this.getJobs(userId)
    } catch (error) {
      this.error = error.message
      console.error(error.message)
    }
  },
  methods: {
    async getUserData(userId) {
      const response = await fetch(
        `http://localhost:3003/user/OneUser/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            userId: userId
          }
        }
      )
      if (!response.ok) {
        const data = await response.json()
        throw new Error(
          data.error || "Impossible de récupérer les données de l'utilisateur"
        )
      }
      const data = await response.json()
      this.user = data
      console.log('User:', this.user)
    },
    async getVisitorData(sessionId) {
      console.log('Session ID:', sessionId)

      const headers = {
        'Content-Type': 'application/json',
        Authorization: sessionId
      }

      const userIdResponse = await fetch(
        `http://localhost:3003/user/getUserIdFromSession/${sessionId}`,
        {
          headers: headers
        }
      )
      if (!userIdResponse.ok) {
        const data = await userIdResponse.json()
        throw new Error(
          data.error || "impossible de récupérer l'ID de l'utilisateur"
        )
      }
      const responseData = await userIdResponse.json()
      const visitorId = responseData.userId

      const userResponse = await fetch(
        `http://localhost:3003/user/OneUser/${visitorId}`,
        {
          headers: headers
        }
      )

      if (!userResponse.ok) {
        const data = await userResponse.json()
        throw new Error(
          data.error || "Impossible de récupérer les données de l'utilisateur"
        )
      }
      const data = await userResponse.json()
      this.visitorId = data.id
      console.log('Visitor ID:', this.visitorId)
    },
    async getExperiences(userId) {
      const response = await fetch(
        `http://localhost:3003/experience/ExperienceByUser/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            userId: userId
          }
        }
      )
      if (!response.ok) {
        const data = await response.json()
        throw new Error(
          data.error ||
          "Impossible de récupérer les expériences de l'utilisateur"
        )
      }
      const data = await response.json()
      this.experiences = data
      console.log('Expériences:', this.experiences)
    },
    async getJobs(userId) {
      const response = await fetch(
        `http://localhost:3003/job/AllJobsByUser/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            userId: userId
          }
        }
      )
      if (!response.ok) {
        const data = await response.json()
        throw new Error(
          data.error || "Impossible de récupérer les emplois de l'utilisateur"
        )
      }
      const data = await response.json()
      this.jobs = data
      console.log('Jobs :', this.jobs)
    },
    logout() {
      localStorage.removeItem('sessionId')
      localStorage.setItem('sessionId', '')
      console.log('Session ID:', localStorage.getItem('sessionId'))
      reloadNuxtApp()
      this.$router.push('/login')
    },
    checkTokenAndRedirect() { },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
