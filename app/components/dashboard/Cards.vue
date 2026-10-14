<script setup>
const authStore = useAuthStore()

const cardItems = [
  {
    label: 'People',
    icon: 'people'
  },
  {
    label: 'Schedule',
    icon: 'calendar'
  },
  {
    label: 'Job Orders',
    icon: 'document'
  },
  {
    label: 'Interviews',
    icon: 'phone'
  },
  {
    label: 'Time Cards',
    icon: 'clock'
  },
  {
    label: 'Financial',
    icon: 'currency'
  },
  {
    label: 'Expenses',
    icon: 'shopbag'
  },
]

const loaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    loaded.value = true
  }, 100)
})
onBeforeRouteLeave(async (to, from) => {
  //console.log('Component is about to unmount')
  loaded.value = false

})
</script>

<template>
  <div class="db-cards">
        
    <div 
    class="db-card" 
    v-for="(item, idx) in cardItems" 
    :key="item.label" 
    :style="{transitionDelay: `${idx * 200}ms`}"
    :data-idx="idx" 
    :class="{ show: loaded }">
      
      <div class="db-card-header">
        <h4>{{ item.label }}</h4> 
        <UiCardIcon :icon="item.icon" />
      </div>

    </div>

  </div>
</template>

<style lang="scss">
.db-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fill, max-content);
  gap: 1rem;

  .db-card {
    --timing: .5s;
    padding: 1rem;
    background: #fff;
    border-radius: .8rem;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: box-shadow 0.3s ease;
    color: rgb(209, 213, 219);
    opacity: 0;
    transform: translateY(20px);
    visibility: hidden;
    transition: opacity var(--timing) ease-out, transform var(--timing) ease-out, visibility var(--timing) ease allow-discrete;
    

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      color: red;

      .card-icon {
        color: var(--primary-color);
      }
    }

    &.show {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }
    

    // @starting-style {
    //   .db-card.show {
    //     opacity: 0;
    //     transform: translateY(20px);
    //     visibility: visible;
    //   }
    // }

    .db-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: uppercase;
      font-weight: bold;
      font-size: .8rem;
      color: var(--gray-600);
    }
  }
}
</style>