<template>
  <section>
    <BaseCard>
      <h2>Register as a coach</h2>
      <CoachForm @save-data="saveData"></CoachForm>
    </BaseCard>
  </section>
</template>

<script setup>
import CoachForm from './CoachForm.vue';
import BaseCard from '../ui/BaseCard.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

function saveData(payload){
  store.dispatch('coach/registerCoach', payload); //save the data to memory
  //router.push({name: 'coaches'}); // go back to /coaches url (pushes url into history)
  router.replace({name: 'coaches'}) //replaces current url on history stack without adding to history
}
</script>

<style scoped></style>
