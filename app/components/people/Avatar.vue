<script setup>
const props = defineProps({
})
</script>
<template>
  <div class="people-avatar">
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#9ca3af"></circle>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#9ca3af"></path>
    </svg>
  </div>
</template>

<style lang="scss">
.people-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgb(229, 231, 235);
  border: 1.5px solid rgb(209, 213, 219);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 40px;
    height: 40px;
  }
}

// @keyframes bounce {

//   0%,
//   100% {
//     transform: translateY(0);
//   }

//   50% {
//     transform: translateY(-30%);
//   }
// }
</style>