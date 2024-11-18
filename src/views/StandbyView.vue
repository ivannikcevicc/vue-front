<script setup>
import { onMounted } from "vue";

onMounted(() => {
  let echo = new Echo({
    broadcaster: "pusher",
    key: "mykey",
    cluster: "mt1",
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
  });
});
</script>
<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Waiting for ride request...</h1>
    <div class="mt-8 flex justify-center">Loading...</div>
  </div>
</template>
<style></style>
