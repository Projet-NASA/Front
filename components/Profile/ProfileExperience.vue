<template>
    <div v-if="experience.userId == user.id" class="mx-6 mt-4 border-t border-secondary-300 pt-4">
        <div class="flex flex-col justify-between">
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row items-start space-x-5">
                    <h2 class="text-lg">{{ experience.title }}</h2>
                    <h2 class="text-lg">{{ experience.company }}</h2>
                </div>
                <div class="flex flex-row items-center">

                    <h2 class="text-lg">
                        {{ formatDate(experience.from) }} - {{ formatDate(experience.to) }}
                    </h2>
                </div>
            </div>
            <div class="flex flex-row justify-start mt-2 space-x-4">
                <h2 class="text-lg">{{ experience.type }}</h2>
                <h2 class="text-lg">{{ experience.location }}</h2>
            </div>
        </div>
        <p class="font-light mt-2">{{ experience.description }}</p>
        <div class="flex flex-row justify-start mt-4 space-x-4">
            <button
                class="bg-primary-default hover:bg-primary-400 text-white rounded-full h-10 w-10 mt-4 mr-4 flex items-center justify-center transition-colors duration-300"
                @click="showExperienceForm = true"
                title="Edit experience">
                <Icon name="material-symbols:edit" class="text-white" />
            </button>
            <button
                class="bg-red-500 hover:bg-red-400 text-white rounded-full h-10 w-10 mt-4 mr-4 flex items-center justify-center transition-colors duration-300"
                @click=""
                title="Delete experience">
                <Icon name="material-symbols:delete" class="text-white" />
            </button>
        </div>
    </div>
    <div v-if="showExperienceForm"
        class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center pb-full">
        <ProfileExperiencesForm :isEdit="true" :class="showExperienceForm ? 'block' : 'hidden'" />
        <button @click="showExperienceForm = false"
            class="absolute top-2 left-2 sm:top-10 sm:left-24 md:left-40 md:top-10 lg:left-1/4 z-50 ml-2 hover:bg-primary-400 rounded-full w-10 h-10 flex justify-center items-center transition-colors duration-300">
            <Icon name="material-symbols:close" class="w-6 h-6" />
        </button>
    </div>
</template>

<script setup lang="ts">
const showExperienceForm = ref(false)

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
}

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    experience: {
        type: Object,
        required: true
    }
})

const { user, experience } = toRefs(props)
</script>