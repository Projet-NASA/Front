<template>
    <section :class="[
        'min-h-screen',
        'flex',
        'justify-center',
        'items-center',
        'w-full',
        'lg:w-1/2',
        'top-0',
        'right-0',
        'lg:left-1/4',
        'z-50',
        'absolute']">
        <div class="w-full sm:w-3/4 md:w-2/3 lg:w-full">
            <form @submit.prevent="submitForm" class="bg-background-200 shadow-md rounded px-8 pt-6 pb-8 mb-2">
                <h1 class="text-2xl font-bold mb-5 text-center text-text-default">
                    Add a Job
                </h1>
                <div class="flex flex-col justify-center w-3/4 mx-auto space-y-3">
                    <div>
                        <label for="title" class="block text-text-default text-base font-bold mb-2">Title</label>
                        <input id="title" v-model="title" type="text" required
                            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label for="company" class="block text-text-default text-base font-bold mb-2">Company</label>
                        <input id="company" v-model="company" type="text" required
                            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label for="location" class="block text-text-default text-base font-bold mb-2">Location</label>
                        <input id="location" type="text" v-model="location" required
                            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label for="type" class="block text-text-default text-base font-bold mb-2">Type</label>
                        <select id="type" v-model="type" required
                            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="" disabled selected>Select a type</option>
                            <option value="internship">Internship</option>
                            <option value="apprenticeship">Apprenticeship</option>
                            <option value="fixed-term-contract">Fixed-term contract</option>
                            <option value="permanent-contract">Permanent contract</option>
                        </select>
                    </div>
                    <div class="w-full mr-0 sm:mr-4">
                        <label for="start date" class="block text-text-default text-base font-bold mb-2">Start Date</label>
                        <input id="start date" v-model="start_date" type="date" required
                            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label for="description"
                            class="block text-text-default text-base font-bold mb-2">Description</label>
                        <textarea id="description" v-model="description" required
                            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full h-40 py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <button type="submit"
                        class="bg-primary-default hover:bg-primary-400 click:bg-primary-400 text-text-default font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add job
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">

const title = ref('');
const company = ref('');
const start_date = ref('');
const to = ref(new Date().toISOString().split('T')[0]);
const description = ref('');
const location = ref('');
const type = ref('');

const submitForm = () => {
    console.log(title.value, company.value, start_date.value, to.value, description.value, location.value, type.value);
};
</script>
