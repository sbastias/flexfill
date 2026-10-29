<script setup>
const authStore = useAuthStore()
</script>

<template>
  <div class="dashboard-container centered-container">

    <div id="dashboard">

      <div class="dashboard-header">
        <h1>
          Welcome back, {{ authStore.firstName }}
        </h1>
      </div>

      <div class="db-filters">

      </div>

      <DashboardCards />

      <DashboardAlerts />

    </div>
    
  </div>
</template>

<style scoped>
.db-card {
  corner-shape: squircle;
}
</style>
<style scoped lang="scss">


.dashboard-container {
  h1 {
    margin: 2rem 0;
  }
}
#dashboard {

  width: 100%;
  max-width: 1200px;
  font-size: .8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

</style>