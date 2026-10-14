<script setup>
const authStore = useAuthStore()
</script>

<template>

  <div class="account-controls">
     <span class="avatar">
      <img :src="authStore.logo" alt="Avatar" />
     </span>
     <div>
        <h2>{{ authStore.fullName }}</h2>
        <div class="title">Title: {{ authStore.title }}</div>
        <div class="company">Company: {{ authStore.company }}</div>
        <div class="site">Site: {{ authStore.site }}</div>
     </div>
  </div>

</template>

<style scoped lang="scss">
.account-controls {
  width: max-content;
  min-width: 350px;
  font-size: .9rem;

  h2 {
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  .title {margin: 0.5rem 0;}
  .company {margin: 0.3rem 0;}
  .site {margin: 0.3rem 0;}
}
.avatar {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.avatar img {
  width: 80%;
  height: 80%;
  object-fit: cover;
}
</style>