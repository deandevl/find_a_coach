<template>
  <div>
    <h3>Contact Coach {{ fullName }}</h3>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Email</label>
        <input id="email" type="email" v-model.trim="emailRef" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message" rows="5" v-model.trim="messageRef"></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">
        Please enter a valid email and non-empty message.
      </p>
      <div class="actions">
        <BaseButton>Send Message</BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BaseButton from '../ui/BaseButton.vue';

const store = useStore();
const router = useRouter();

const emailRef = ref('');
const messageRef = ref('');
const formIsValid = ref(true);

const props = defineProps({
  id: {
    type: String,
  },
});
const fullName = computed(() => {
  const coaches = store.getters['coach/coaches'];
  const a_coach = coaches.find((coach) => {
    return coach.id === props.id;
  });
  return `${a_coach.firstName} ${a_coach.lastName}`;
});
function submitForm() {
  formIsValid.value = true;
  if (
    emailRef.value === '' ||
    !emailRef.value.includes('@') ||
    messageRef.value === ''
  ) {
    formIsValid.value = false;
    return;
  }
  store.dispatch('request/contactCoach', {
    email: emailRef.value,
    message: messageRef.value,
    coachId: props.id,
  });
  router.replace({ name: 'coaches' }); //replaces current url on history stack without adding to history
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
