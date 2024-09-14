<template>
  <div>
    <BaseDialog
      :show="!!loadingError"
      title="An Error Occurred Loading Coaches!"
      @close="handleLoadingError"
    >
      <p>{{ loadingError }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters"></CoachFilter>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)"
            >Refresh</BaseButton
          >
          <BaseButton link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</BaseButton
          >
          <BaseButton
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >Register as Coach</BaseButton
          >
        </div>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasCoaches && !isLoading">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :descrip="coach.descrip"
            :rate="coach.rate"
          ></CoachItem>
        </ul>
        <h3 v-else>No coaches have been registered. Register a coach.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import CoachItem from './CoachItem.vue';
import CoachFilter from './CoachFilter.vue';
import BaseCard from '../ui/BaseCard.vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';

const isLoading = ref(false);
const loadingError = ref(null);
const activeFilters = ref({
  frontend: true,
  backend: true,
  career: true,
});

const store = useStore();

async function loadCoaches(forceRefresh) {
  isLoading.value = true;
  try {
    await store.dispatch('coach/loadCoaches', { forceRefresh: forceRefresh });
  } catch (error) {
    loadingError.value =
      error.message || 'Something went wrong loading coaches!';
  }
  isLoading.value = false;
}
function setFilters(updatedFilters) {
  activeFilters.value = updatedFilters;
}

function handleLoadingError() {
  loadingError.value = null;
}

const isLoggedIn = computed(() => {
  return store.getters['auth/isAuthenticated'];
});

const isCoach = computed(() => {
  return store.getters['coach/isCoach'];
});

const filteredCoaches = computed(() => {
  const coaches = store.getters['coach/coaches'];
  return coaches.filter((coach) => {
    if (activeFilters.value.frontend && coach.areas.includes('frontend')) {
      return true;
    }
    if (activeFilters.value.backend && coach.areas.includes('backend')) {
      return true;
    }
    if (activeFilters.value.career && coach.areas.includes('career')) {
      return true;
    }
    return false;
  });
});
const hasCoaches = computed(() => {
  return !isLoading.value && store.getters['coach/hasCoaches'];
});

onMounted(() => {
  loadCoaches(false);
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
