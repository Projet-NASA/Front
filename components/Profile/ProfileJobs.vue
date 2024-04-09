<template>
    <div v-if="job.userId == user.id" class="mx-6 mt-4 border-t border-secondary-300 pt-4">
        <div class="flex flex-col justify-between">
            <h2 class="text-lg">{{ job.title }}</h2>
            <div class="flex flex-row justify-between">
                <h2 class="text-lg">{{ job.company }}</h2>
                <h2 class="text-lg">
                    {{ formatDate(job.from) }} - {{ formatDate(job.to) }}
                </h2>
                <h2 class="text-lg">{{ job.type }}</h2>
                <h2 class="text-lg">{{ job.location }}</h2>
            </div>
        </div>
        <p class="font-light">{{ job.description }}</p>
        <div class="flex flex-row justify-start mt-4 space-x-4">
            <button
                class="bg-primary-default hover:bg-primary-400 text-white rounded-full h-10 w-10 mt-4 mr-4 flex items-center justify-center transition-colors duration-300"
                @click="showJobForm = true"
                title="Edit job">
                <Icon name="material-symbols:edit" class="text-white" />
            </button>
            <button
                class="bg-red-500 hover:bg-red-400 text-white rounded-full h-10 w-10 mt-4 mr-4 flex items-center justify-center transition-colors duration-300"
                @click=""
                title="Delete job">
                <Icon name="material-symbols:delete" class="text-white" />
            </button>
        </div>
    </div>
    <div v-if="showJobForm"
        class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <ProfileJobsForm :isEdit="true" :class="showJobForm ? 'block' : 'hidden'" />
        <button @click="showJobForm = false"
            class="absolute top-2 left-2 sm:top-10 sm:left-24 md:left-40 md:top-10 lg:left-1/4 z-50 ml-2 hover:bg-primary-400 rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-300">
            <Icon name="material-symbols:close" class="w-6 h-6" />
        </button>
    </div>
</template>

<script setup lang="ts">
const showJobForm = ref(false)

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
}

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    job: {
        type: Object,
        required: true
    }
})

const { user, job } = toRefs(props)
</script>