<template>
  <TheHeader></TheHeader>
  <router-view v-slot="slotProps">
    <Transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </Transition>
  </router-view>
</template>

<script setup>
import TheHeader from "./components/nav/TheHeader.vue";
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, watch } from 'vue';

const store = useStore();
const router = useRouter();

const didAutoLogout = computed(()=>{
  return store.getters['auth/didAutoLogout']
})
watch(didAutoLogout, (curValue, oldValue) =>{
  if(curValue && curValue !== oldValue){
    router.replace('/coaches');
  }
});

onMounted(()=>{
  store.dispatch('auth/autoLogin')
})
</script>

<style scoped>
  .route-enter-from {
    opacity: 0;
    transform: translateY(-30px);
  }
  .route-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .route-enter-active {
    transition: all 1s ease-out;
  }
  .route-leave-active {
    transition: all 1s ease-in;
  }

  .route-enter-to,
  .route-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>
