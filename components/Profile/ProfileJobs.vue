<template>
  <div
    v-if="job.userId == user.id"
    class="mx-6 mt-4 border-2 border-primary-200 p-4 rounded-xl"
  >
  <div class="flex flex-col justify-between">
    <h2 class="text-lg font-bold">{{ job.title }}</h2>
      <div class="flex flex- justify-start space-x-3">
        <h2>{{ job.company }}</h2>
        <h2>{{ job.location }}</h2>
      </div>  
        <h2 class="font-thin">
          {{ formatDate(job.from) }}
        </h2>
        <h2>{{ job.type }}</h2>
    </div>
    <p class="font-light mt-2">{{ job.description }}</p>
    <div
      v-if="visitorId === user.id"
      class="flex flex-row justify-start space-x-4"
    >
      <button
        class="bg-primary-default hover:bg-primary-400 text-white rounded-full h-10 w-10 mt-4 mr-4 flex items-center justify-center transition-colors duration-300"
        @click="showJobForm = true"
        title="Edit job"
      >
        <Icon name="material-symbols:edit" class="text-white w-6 h-6" />
      </button>
      <button
        class="bg-red-500 hover:bg-red-800 text-white rounded-full h-10 w-10 mt-4 mr-4 flex items-center justify-center transition-colors duration-300"
        @click=""
        title="Delete job"
      >
        <Icon name="material-symbols:delete" class="text-white w-6 h-6" />
      </button>
    </div>
  </div>
  <div
    v-if="showJobForm"
    class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
  >
    <ProfileJobsForm :isEdit="true" :class="showJobForm ? 'block' : 'hidden'" />
    <button
      @click="showJobForm = false"
      class="absolute top-2 left-2 sm:top-10 sm:left-24 md:left-40 md:top-10 lg:left-1/4 z-50 ml-2 hover:bg-primary-400 rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-300"
    >
      <Icon name="material-symbols:close" class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
const showJobForm = ref(false)
const visitorId = ref(localStorage.getItem('userId'))

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  visitorId: {
    type: String,
    required: true
  },
  job: {
    type: Object,
    required: true
  }
})

const { user, job } = toRefs(props)
</script>
