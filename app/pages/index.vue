<script setup>
import Dashboard from '~/components/dashboard/index.vue';

onMounted(() => {
  
})

</script>
<template>
  <div class="dashboard page-container">
    <Dashboard />
  </div>
</template>

<style lang="scss">
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background: var(--gray-bg);
  
}
</style>