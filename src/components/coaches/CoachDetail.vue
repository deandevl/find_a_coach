<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton link :to="contactLink">Contact</BaseButton>
        </header>
        <router-view></router-view>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></BaseBadge>
        <p>{{ descrip }}</p>
      </BaseCard>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import BaseCard from '../ui/BaseCard.vue';
import BaseBadge from '../ui/BaseBadge.vue';
import BaseButton from '../ui/BaseButton.vue';

const store = useStore();

const props = defineProps({
  id: {
    type: String,
  },
});

const fullName = ref('');
const areas = ref(null);
const rate = ref(0);
const descrip = ref('');
const mode = ref('badge');

onMounted(() => {
  const coaches = store.getters['coach/coaches'];
  const coach = coaches.find((coach) => {
    return coach.id === props.id;
  });
  fullName.value = `${coach.firstName}  ${coach.lastName}`;
  areas.value = coach.areas;
  rate.value = coach.rate;
  descrip.value = coach.descrip;
});
const contactLink = computed(() => {
  return `/coaches/${props.id}/contact`;
});
</script>

<style scoped></style>
