<script setup>
import { useRouter } from "vue-router";
import http from "@/helpers/http"; // Ensure this matches your project's HTTP service setup

const router = useRouter();

const handleFindARide = () => {
  router.push({
    name: "location",
  });
};

const handleStartDriving = () => {
  http()
    .get("/api/driver")
    .then((response) => {
      if (response.data.driver) {
        router.push({
          name: "standby",
        });
      } else {
        router.push({
          name: "driver",
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching driver status:", error);
    });
};
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Ride share app</h1>
    <div
      class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left"
    >
      <div class="bg-white px-4 py-5 sm:p-6">
        <div class="flex justify-between">
          <button
            @click="handleStartDriving"
            class="rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white"
          >
            Start driving
          </button>
          <button
            @click="handleFindARide"
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
