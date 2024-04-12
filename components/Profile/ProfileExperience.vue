<template>
  <div
    v-if="experience.userId == user.id"
    class="mx-6 my-4 border-2 border-primary-200 p-4 rounded-xl h-fit w-max"
  >
    <div class="flex flex-col justify-between">
      <h2 class="text-lg font-bold">{{ experience.title }}</h2>
      <div class="flex flex- justify-start space-x-3">
        <h2>{{ experience.company }}</h2>
        <h2>{{ experience.location }}</h2>
      </div>
      <h2 class="font-thin">
        {{ formatDate(experience.from) }} - {{ experience.current ? 'Current' : formatDate(experience.to)}}
      </h2>
      <h2>{{ experience.type }}</h2>
    </div>
    <p class="font-light mt-2">{{ experience.description }}</p>
    <div
      v-if="visitorId === user.id"
      class="flex flex-row justify-start space-x-4"
    >
      <button
        class="bg-red-500 hover:bg-red-800 text-white rounded-full h-10 w-10 mt-4 mr-4 flex items-center justify-center transition-colors duration-300"
        @click="deleteExperience(experience.id)"
        title="Delete experience"
      >
        <Icon name="material-symbols:delete" class="text-white w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const showExperienceForm = ref(false)

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
  experience: {
    type: Object,
    required: true
  }
})
const deleteExperience = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3003/experience/Experience/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(await response.text())
    }

    location.reload()
  } catch (error) {
    console.error(error)
  }
}

const { user, experience } = toRefs(props)
</script>
