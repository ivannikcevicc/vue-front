// Importing Vue Router and components
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import LandingView from "@/views/LandingView.vue";
import LocationView from "@/views/LocationView.vue";
import MapView from "@/views/MapView.vue";
import TripView from "@/views/TripView.vue";
import StandbyView from "@/views/StandbyView.vue";
import DriverView from "@/views/DriverView.vue";

// Importing Axios for API calls
import axios from "axios";

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/landing",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/location",
      name: "location",
      component: LocationView,
    },
    {
      path: "/map",
      name: "map",
      component: MapView,
    },
    {
      path: "/trip",
      name: "trip",
      component: TripView,
    },
    {
      path: "/standby",
      name: "standby",
      component: StandbyView,
    },
    {
      path: "/driver",
      name: "driver",
      component: DriverView,
    },
  ],
});

// Navigation guard to check token authentication
router.beforeEach((to, from) => {
  // Allow navigation to login page
  if (to.name === "login") {
    return true;
  }

  // Redirect to login page if token is not present
  if (!localStorage.getItem("token")) {
    return {
      name: "login",
    };
  }

  // If token exists, verify its authenticity
  checkTokenAuthenticity();
});

// Function to check token validity
const checkTokenAuthenticity = () => {
  axios
    .get("http://localhost/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      // Token is valid, you can handle the response here if needed
    })
    .catch(() => {
      // Token is invalid, remove it and redirect to login page
      localStorage.removeItem("token");
      router.push({
        name: "login",
      });
    });
};

// Export router instance
export default router;
