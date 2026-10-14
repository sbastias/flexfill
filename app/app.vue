<script setup>
const Toast = useToaster()
</script>

<template>

  <NuxtLayout>

    <UiToaster />

    <NuxtPage />

  </NuxtLayout>

</template>

<style lang="scss">
@use "@/assets/scss/reset.scss";
@use "@/assets/scss/theme.scss";
@use "@/assets/scss/forms.scss";
@use "@/assets/scss/buttons.scss";

html {
  transition: background 0.3s ease;
  //font-size: 12px;
}

.page-container {
  //padding: 2rem;
}
</style>


