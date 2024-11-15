<script setup>
import { vMaska } from "maska/vue";
import { reactive, ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const credentials = reactive({
  phone: null,
  login_code: null,
});

const waitingOnVerification = ref(false);

onMounted(() => {
  if (localStorage.getItem("token")) {
    router.push({
      name: "landing",
    });
  }
});

const formattedCredentials = computed(() => {
  return {
    phone: credentials.phone.replaceAll(" ", ""),,
    login_code: credentials.login_code,

  }
})

const handleLogin = () => {
  axios
    .post("http://localhost/api/login", formattedCredentials)
    .then((response) => {
      console.log(response.data);
      waitingOnVerification.value = true;
    })
    .catch((error) => {
      console.error(error);
      alert(error.response.data.message);
    });
};

const handleVerification = () => {
  axios
    .post("http://localhost/api/login/verify", formattedCredentials)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data);
      router.push({
        name: "index",
      });
    })
    .catch((error) => {
      console.error(error);
      alert(error.response.data.message);
    });
};
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">Enter your phone number.</h1>
    <form
      v-if="!waitingOnVerification"
      action="#"
      @submit.prevent="handleLogin"
    >
      <div
        class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left"
      >
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
              v-maska
              v-model="credentials.phone"
              data-maska="+### ## ### ###"
              type="text"
              name="phone"
              placeholder="+382 23 456 789"
              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            @submit.prevent="handleLogin"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
    <form v-else action="#" @submit.prevent="handleVerification">
      <div
        class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left"
      >
        <div class="bg-white px-4 py-5 sm:p-6">
          <div>
            <input
              v-maska
              v-model="credentials.login_code"
              data-maska="######"
              type="text"
              name="login_code"
              placeholder="666 666"
              class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            @submit.prevent="handleVerification"
            class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-white"
          >
            Verify
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style></style>
