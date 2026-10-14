<script setup>

  const {visible, status, message} = useToaster()

</script>

<template>
  <div id="toaster-container">
    <div :class="[{visible}, status]" montserrat-500>
      {{ message || 'Default Message' }}
    </div>
  </div>
</template>



<style lang="scss">
#toaster-container {

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: visible;
  z-index: 100000000;
  height: 0;
  text-align: center;
  pointer-events: none;

  > div {
    position: relative;
    width: 95%;
    max-width: 1000px;
    display: inline-block;
    margin: 0 auto;
    top: 150px;
    padding: 15px 25px;
    opacity: 0;
    transform: translateY(-50px);
    transition: .4s ease-out;

    background: rgba(0,0,0,0.5);
    color: #ddd;
    border-width: 1px;
    border-style: solid;
    border-color: #ddd;
    border-radius: 5px;

    &.success {
      background: rgba(186, 255, 217, 0.9);
      color: rgb(1, 106, 43);
      border-color: rgb(1, 106, 43);
    }
    &.error {
      background: rgba(255, 176, 201, 0.9);
      color: rgb(86, 3, 42);
      border-color: rgb(86, 3, 42);
      pointer-events: all;
    }

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

</style>