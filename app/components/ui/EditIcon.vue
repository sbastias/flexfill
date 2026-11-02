<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: '10px'
  }
})
</script>

<template>
  <div :style="{ 'font-size': size }" class="edit-icon">
    <svg :class="{active}" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  </div>
</template>

<style lang="scss">
.edit-icon {
  cursor: pointer;
  svg {
    stroke: #bcc2ce;
    height: 1em;
    width: 1em;
  }
  .active {
    stroke: #009637;
  }
}
</style>