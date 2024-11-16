<script setup>
import { useLocationStore } from "@/stores/location";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import http from "@/helpers/http";

const location = useLocationStore();
const router = useRouter();
const gMap = ref(null);

const handleConfirmTrip = () => {
  http()
    .post("/api/trip", {
      origin: location.current.geometry,
      destination: location.destination.geometry,
      destination_name: location.destination.name,
    })
    .then((response) => {
      router.push({
        name: "trip",
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(async () => {
  // Redirect if no destination is selected
  if (!location.destination.name) {
    router.push({
      name: "location",
    });
    return;
  }

  // Fetch user's current location
  await location.updateCurrentLocation();

  // Draw a path on the map
  gMap.value.$mapPromise.then((mapObject) => {
    const currentPoint = new google.maps.LatLng(
      location.current.geometry.lat,
      location.current.geometry.lng
    );
    const destinationPoint = new google.maps.LatLng(
      location.destination.geometry.lat,
      location.destination.geometry.lng
    );

    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({
      map: mapObject,
    });

    directionsService.route(
      {
        origin: currentPoint,
        destination: destinationPoint,
        avoidTolls: false,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(res);
        } else {
          console.error("Failed to fetch directions:", status);
        }
      }
    );
  });
});
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Here is your trip</h1>
    <div
      class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left"
    >
      <div class="bg-white px-4 py-5 sm:p-6">
        <div>
          <GMapMap
            :zoom="11"
            v-if="location.destination.name"
            ref="gMap"
            :center="location.destination.geometry"
            style="width: 100%; height: 256px"
          >
            <GMapMarker :position="location.destination.geometry" />
          </GMapMap>
        </div>
        <div class="mt-2">
          <p class="text-xl">
            Going to my <strong>{{ location.destination.name }}</strong>
          </p>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          @click="handleConfirmTrip"
          class="inline-flex rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white"
        >
          Let's Go!
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
