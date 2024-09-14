<template>
  <div>
    <BaseDialog
      :show="!!loadingError"
      title="An Error Occurred Loading Requests!"
      @close="handleLoadingError"
    >
      <p>{{ loadingError }}</p>
    </BaseDialog>
    <section>
      <BaseCard>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <RequestItem
            v-for="req in requests"
            :key="req.id"
            :email="req.email"
            :message="req.message"
          ></RequestItem>
        </ul>
        <h3 v-else>You haven't received any request yet!</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import BaseCard from '../ui/BaseCard.vue';
import RequestItem from './RequestItem.vue';
import BaseSpinner from '../ui/BaseSpinner.vue';

const isLoading = ref(false);
const loadingError = ref(null);

const store = useStore();

async function loadRequests() {
  isLoading.value = true;
  try {
    await store.dispatch('request/loadRequests');
  } catch (error) {
    loadingError.value =
      error.message || 'Something went wrong loading requests!';
  }
  isLoading.value = false;
}

const requests = computed(() => {
  return store.getters['request/requests'];
});
const hasRequests = computed(() => {
  return store.getters['request/hasRequests'];
});

function handleLoadingError() {
  loadingError.value = null;
}

onMounted(() => {
  loadRequests();
});
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
