<template>
    <section
        class="bg-gray-950 bg-opacity-50 min-h-screen flex justify-center items-center w-full absolute top-0 left-0 z-50">
        <div class="w-1/2 my-8">
            <form @submit.prevent="submitForm" class="bg-background-200 shadow-md rounded px-8 pt-6 pb-8 mb-2">
                <div class="flex justify-center items-center mb-8">
                    <img src="../../assets/images/logo-transparent.png" class="w-28 h-28" />
                </div>
                <h1 class="text-2xl font-bold mb-5 text-center text-text-default">
                    Add an experience
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
                    <div class="flex justify-between">
                        <div class="w-full mr-4">
                            <label for="from" class="block text-text-default text-base font-bold mb-2">From</label>
                            <input id="from" v-model="from" type="date" required
                                class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="w-full ml-4">
                            <label for="to" class="block text-text-default text-base font-bold mb-2">To</label>
                            <input id="to" v-model="to" type="date"
                                class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>
                    <div>
                        <label for="description" class="block text-text-default text-base font-bold mb-2">Description</label>
                        <textarea id="description" v-model="description" required
                            class="bg-background-default shadow appearance-none border-primary-800 border rounded w-full h-40 py-2 px-3 text-text-default mb-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <button type="submit"
                        class="bg-primary-default hover:bg-primary-400 text-text-default font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add experience
                    </button>
                </div>
            </form>
            <p v-if="message" class="text-center text-bold mt-3">{{ message }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">import { ref } from 'vue';

const title = ref('');
const company = ref('');
const from = ref('');
const to = ref('');
const description = ref('');

const submitForm = () => {
    // Handle form submission
};
</script>
