import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

export const useLocationStore = defineStore("location", () => {
  const destination = reactive({
    name: "",
    address: "",
    geometry: {
      lat: null,
      lng: null,
    },
  });
  const current = reactive({
    geometry: {
      lat: null,
      lng: null,
    },
  });

  const updateCurrentLocation = async () => {
    const position = await getUserLocation();
    current.geometry = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  };
  return { destination, current, updateCurrentLocation };
});
