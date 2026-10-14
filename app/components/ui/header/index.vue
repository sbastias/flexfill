<template>
  <header>

    <div id="logo-user-container">
    
      <div class="logo"><h1>Flexfill</h1></div>

      <UiHeaderAccountDetails />

    </div>
      
    
    <UiHeaderMainNav />

  </header>
</template>

<style scoped lang="scss">
header {
  background-color: white;
  z-index: 10;
  width: 100%;

  .logo {
    font-size: 1rem;
    font-weight: bold;
  }

  #logo-user-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: .5rem;
  }
}
</style>