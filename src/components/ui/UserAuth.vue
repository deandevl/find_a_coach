<template>
  <div>
    <BaseDialog
      :show="!!loadingError"
      title="An Authentication Error Occurred!"
      @close="handleLoadingError"
    >
      <p>{{ loadingError }}</p>
    </BaseDialog>
    <BaseDialog :show="isLoading" title="Authenticating" fixed>
      <BaseSpinner></BaseSpinner>
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="emailRef" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="passwordRef" />
        </div>
        <p v-if="!formIsValidRef">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from './BaseButton.vue';
import BaseCard from './BaseCard.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();

const emailRef = ref('');
const passwordRef = ref('');
const formIsValidRef = ref(true);
const modeRef = ref('login');
const isLoading = ref(false);
const loadingError = ref(null);

async function submitForm() {
  formIsValidRef.value = true;
  if (
    emailRef.value === '' ||
    !emailRef.value.includes('@') ||
    passwordRef.value.lengh < 6
  ) {
    formIsValidRef.value = false;
    return;
  } else {
    isLoading.value = true;
    // send http request..
    const actionPayload = {
      email: emailRef.value,
      password: passwordRef.value,
    };
    try {
      if (modeRef.value === 'login') {
        await store.dispatch('auth/login', actionPayload);
      } else {
        await store.dispatch('auth/signup', actionPayload);
      }
      const redirectUrl = '/' + (route.query.redirect || 'coaches');
      router.replace(redirectUrl);
    } catch (error) {
      loadingError.value =
        error.message || 'Failed to authenticate, try later.';
    }
    isLoading.value = false;
  }
}
function switchAuthMode() {
  if (modeRef.value === 'login') {
    modeRef.value = 'signup';
  } else {
    modeRef.value = 'login';
  }
}
function handleLoadingError() {
  loadingError.value = null;
}
const submitButtonCaption = computed(() => {
  if (modeRef.value === 'login') {
    return 'Login';
  } else {
    return 'Signup';
  }
});
const switchModeButtonCaption = computed(() => {
  if (modeRef.value === 'login') {
    return 'Signup instead';
  } else {
    return 'Login instead';
  }
});
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
