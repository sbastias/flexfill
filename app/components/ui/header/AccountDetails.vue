<script setup>
// const { accountOverlayVisible } = useUiControls();

const authStore = useAuthStore();

// const showDialog = () => {
//   document.getElementById('account-dialog').showModal()
// }

// const hideDialog = () => {
//   document.getElementById('account-dialog').close()
// }
</script>

<template>
  <div class="account-details">

    <!-- UiHeaderAccountPopover /> -->
    <UiHeaderAccountHover />

    <button id="account-details-button">
      <div>
        <h3>{{ authStore.fullName }}</h3>
        <div>{{ authStore.title }} / {{ authStore.department }}</div>
        <div>{{ authStore.company }}</div>
      </div>

      <div>
        <div :style="{ backgroundImage: `url(${authStore.logo})` }"></div>
      </div>
    </button>

  </div>
</template>

<style lang="scss">
.account-details {

  anchor-name: --account-details;

  button {
    font-size: .9rem;
    h3 {
      font-size: 1.1rem;
    }
  }
  

  &:hover {
    #account-details-button {
      background: var(--gray-100);
      cursor: pointer;
      border-color: var(--gray-200);
    }
    #account-hover {
      display: block;
      opacity: 1;
    }
  }

  #account-details-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: .5rem;
    padding: .5rem .5rem .5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: .5rem .5rem .5rem .5rem;
    #{'corner-shape'}: squircle;
    border: 1px solid transparent;
    outline: none;

    > div:first-child {
      text-align: right;
    }

    > div:last-child > div {
      width: 4rem;
      height: 4rem;
      background-size: 80%;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }

  
}
</style>