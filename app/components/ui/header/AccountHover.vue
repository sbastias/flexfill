<script setup>
const authStore = useAuthStore()
</script>

<template>

  <div id="account-hover">

    <UiHeaderAccountControls />

  </div>
</template>

<style lang="scss">
#account-hover {
  margin: 0;
  inset: auto;
  position-anchor: --account-details;
  top: calc(anchor(bottom));
  right: anchor(right);
  padding-top: 10px;
  //margin-top: 10px;
  display: none;
  position: absolute;
  z-index: 2;
  transition: opacity 0.3s ease, transform 0.3s ease, display 0s allow-discrete, overlay 0s allow-discrete;
  transform-origin: top right;

  > div {
    padding: 1rem ;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    justify-content: space-between;
    align-items: center;
    gap: .5rem;
    border-radius: 1rem;
    #{'corner-shape'}: squircle;
  }
}

#account-details-button:hover #account-hover { 
  display: block;
  opacity: 1;
}

@starting-style {
  #account-hover {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>