<script setup>
const authStore = useAuthStore()
const { user, departments } = authStore
const Router = useRouter()
const doLogout = () => {
  console.log('Logging out...')
  authStore.reset()
  Router.push('/login')
}
</script>

<template>

  <div class="account-controls">
     <span class="avatar">
      <img :src="user.logo" alt="Avatar" />
     </span>
     <div>
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <div class="title">Title: {{ user.title }}</div>
        <div class="company">Company: {{ user.company }}</div>
        <div class="site">Site: {{ user.site }}</div>
     </div>
     <div>
      <a href="/logout" @click.prevent="doLogout">Logout</a>
     </div>
  </div>

</template>

<style scoped lang="scss">
.account-controls {
  width: max-content;
  min-width: 350px;
  font-size: .9rem;
  z-index: 10000;

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