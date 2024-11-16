<script setup>
import { reactive } from "vue";
import http from "@/helpers/http";
import { useRouter } from "vue-router";

const router = useRouter();
const driverDetails = reactive({
  name: "",
  year: null,
  make: "",
  model: "",
  color: "",
  license_plate: "",
});

const handleSaveDriver = () => {
  http()
    .post("/api/driver", driverDetails)
    .then((response) => {
      router.push({
        name: "standby",
      });
    });
};
</script>

<template>
  <div class="pt-16">
    <form action="#" @submit.prevent="handleSaveDriver">
      <div
        class="overflow-hidden shadow sm:rounded-md mx-auto text-left max-w-sm"
      >
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
              type="text"
              v-model="driverDetails.name"
              placeholder="Full name"
              name="name"
              id="name"
              class="mt-1 w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div class="mt-2">
            <input
              type="number"
              v-model="driverDetails.year"
              placeholder="Car Year"
              name="year"
              id="year"
              class="mt-1 w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div class="mt-2">
            <input
              type="text"
              v-model="driverDetails.make"
              placeholder="Make"
              name="make"
              id="make"
              class="mt-1 w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div class="mt-2">
            <input
              type="text"
              v-model="driverDetails.model"
              placeholder="Model"
              name="model"
              id="model"
              class="mt-1 w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div class="mt-2">
            <input
              type="text"
              v-model="driverDetails.color"
              placeholder="Color"
              name="color"
              id="color"
              class="mt-1 w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div class="mt-2">
            <input
              type="text"
              placeholder="License Plate #"
              v-model="driverDetails.license_plate"
              name="license_plate"
              id="license_plate"
              class="mt-1 w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            @click.prevent="handleSaveDriver"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<style></style>
