<script setup>

defineProps({
  availability: String
})

</script>

<template>
  <div class="availability-indicator">
    
  </div>
</template>

<style lang="scss">
  .availability-indicator {
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    background-color: var(--gray-300);
  }
</style>