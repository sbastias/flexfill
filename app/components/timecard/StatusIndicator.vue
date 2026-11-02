<script setup>
const props = defineProps({
  approved: {
    type: Boolean,
    required: false
  }
})

const statusText = computed(() => {
  return props.approved && 'Approved' || 'Pending Approval'
})
</script>
<template>
  <div class="timecard-status-indicator" :class="{pending: !approved, approved}">
    <div class="swatch"></div>
    <div>{{ statusText }}</div>
  </div>
</template>

<style lang="scss">
.timecard-status-indicator {

  --pending-color: #f59e0b;
  --approved-color: #10b981;

  display: flex;
  align-items: center;
  gap: 0.5em;
  padding:.2rem .6rem .2rem .2rem;
  font-size: .6rem;
  border: 1px solid currentColor;
  border-radius: 9999em;
  background: color-mix(in srgb, currentColor 10%, transparent 90%);

  .swatch {
    width: .6rem;
    height: .6rem;
    border-radius: 50%;
    background: currentColor;
  }
  &.pending {
    color: var(--pending-color);
  }
  &.approved {
    color: var(--approved-color);
  }
}
</style>

