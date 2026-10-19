<script setup>
const authStore = useAuthStore()

const doClose = () => {
    document.getElementById('account-overlay').hide()
}
</script>

<template>
  <dialog id="account-dialog">

    <UiMiniClose target="account-dialog" />

    <UiHeaderAccountControls />

  </dialog>
</template>

<style lang="scss">
#account-dialog {
  margin: 0;
  inset: auto;
  position-anchor: --account-details;
  top: calc(anchor(bottom) + 10px);
  right: anchor(right);
  padding: 2rem 1rem ;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: none;
  justify-content: space-between;
  align-items: center;
  gap: .5rem;
  border-radius: 1rem;
  #{'corner-shape'}: squircle;
  z-index: 9999;
  transition: opacity 0.3s ease, transform 0.3s ease, display 0s allow-discrete, overlay 0s allow-discrete;
  transform-origin: top right;
  opacity: 1;
  transform: scale(1);

  
}

// @starting-style {
//   #account-dialog:popover-open {
//     opacity: 0;
//     transform: scale(0.8);
//   }
// }
</style>