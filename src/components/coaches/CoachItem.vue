<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <BaseBadge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton mode="outline" link :to="contactLink">Contact</BaseButton>
      <BaseButton link :to="detailsLink">View Details</BaseButton>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseBadge from '../ui/BaseBadge.vue';

const props = defineProps({
  id: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  areas: {
    type: Array,
  },
  rate: {
    type: Number,
  },
});
const fullName = computed(() => {
  return `${props.firstName}  ${props.lastName}`;
});
const contactLink = computed(() => {
  return `/coaches/${props.id}/contact`;
  /*return {
    name: 'coach-contact',
    params: { id: props.id },
  };*/
});
const detailsLink = computed(() => {
  return `/coaches/${props.id}`;
});
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
