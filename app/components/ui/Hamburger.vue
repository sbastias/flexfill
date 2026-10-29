<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <button class="hamburger" :class="{ active: props.active }">
    <span>
      <span></span>
    </span>
    <span>
      <span></span>
      <span></span>
    </span>
    <span>
      <span></span>
    </span>
  </button>
</template>

<style lang="scss">
.hamburger {
  pointer-events: none;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1rem;
  height: .9rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  > span {
    display: inline-block;
    width: 1rem;
    height: 2px;
    overflow: visible;
    border-radius: 9999em;
    transition: all 0.3s linear;
    position: relative;

    > span {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 2px;
      width: 100%;
      background: var(--gray-800);
      border-radius: 9999em;
      transition: all 0.3s linear;
      
      
    }
  }

  &.active {
    span:nth-child(1) {
      span {
        opacity: 0;
      }
    }
    span:nth-child(2) {
      > span {
        &:first-child {
          transform: rotate(45deg);
        }
        &:last-child {
          transform: rotate(-45deg);
        }
      }
    }
    span:nth-child(3) {
      span {
        opacity: 0;
      }
    }
  }
}
</style>