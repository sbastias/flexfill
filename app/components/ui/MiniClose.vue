<script setup>
const props = defineProps({
  target: {
    type: String,
    required: false
  }
})
const emits = defineEmits(['click'])
</script>

<template>
  <button class="mini-close" :popovertarget="target" popovertargetaction="hide" @click="emits('click')"></button>
</template>

<style lang="scss">
.mini-close {
  height: 1rem;
  width: 1rem;
  text-indent: 200%;
  overflow: hidden;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--gray-200);
  }

  &:before {
    content: '\00d7'; /* Unicode for multiplication sign (×) */
    text-indent: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    color: var(--gray-900);
  }
}
</style>