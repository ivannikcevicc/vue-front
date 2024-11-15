<script setup></script>
<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Ride share app</h1>
    <div
      class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left"
    >
      <div class="bg-white px-4 py-5 sm:p-6">
        <div class="flex justify-between">
          <button
            type="submit"
            @submit.prevent="handleLogin"
            class="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white"
          >
            Start driving
          </button>
          <button
            type="submit"
            @submit.prevent="handleLogin"
            class="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white"
          >
            Find a ride
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
