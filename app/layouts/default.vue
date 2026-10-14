<template>
  <div class="default-layout">

    <UiHeader />

    <main>
      
      <slot />
      
    </main>
    
  </div>
</template>

<style lang="scss">
.default-layout {
  display: grid;
  width: 100%;
  max-width: 100vw;
  position: relative;
  height: 100dvh;
  max-height: 100dvh;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;

  main {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: auto;
  }
}
</style>