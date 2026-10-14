<script setup>
const items = [
  { id: 'dashboard', label: 'Dashboard', to: '/' },
  { id: 'people', label: 'People', to: '/people' },
  { id: 'schedule', label: 'Schedule', to: '/schedule' },
  { id: 'orders', label: 'Job Orders', to: '/orders' },
  { id: 'timecards', label: 'Timecards', to: '/timecards' },
  { id: 'interviews', label: 'Interviews', to: '/interviews' },
  { id: 'financial', label: 'Financial', to: '/financial' },
  { id: 'expenses', label: 'Expenses', to: '/expenses' },
]

const route = useRoute()
const { abortAndReset } = useController()

const cancelAndNavigate = (e, navigate) => {

  e.preventDefault()
  abortAndReset() // from useController(), then...
  navigate()

}

const isItemActive = (to) => {
  if (to === '/') return route.path === '/'
  
  // Matches exact path or any nested sub-path (e.g., /scheduling/123)
  return route.path === to || route.path.startsWith(`${to}/`)
}

onMounted(() => {

  console.log('Current route:', route.fullPath)
  document.querySelector('nav')?.classList.remove('unloaded')

})

</script>

<template>
  <nav class="unloaded">
    <ul>
      <li v-for="item in items" :key="item.id">
      <nuxt-link :to="item.to" custom v-slot="{ navigate, href }">
          <a
            :href="href"
            @click="(e) => cancelAndNavigate(e, navigate)"
            :class="{ 'active': isItemActive(item.to) }"
          >
            {{ item.label }}
          </a>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  grid-column: span 2;
  padding: 0;
  font-family: 'Work Sans', sans-serif;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1rem;
    background-color: rgba(0, 0, 0, 0.02);
    position: relative;

    /* The indicator pseudo-element on the container */
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      background: rgba(0, 0, 0, 0.05);
      z-index: 0;
      opacity: 0;

      /* Enable transitions for left, right, and opacity */
      transition: 
        left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        right 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.2s ease;

      /* Initial starting style before anchor resolves */
      @starting-style {
        opacity: 0;
      }
    }

    /* Only show and anchor indicator when a child link is active */
    &:has(a.active) {
      &:after {
        opacity: 1;
        position-anchor: --hovered-link;
        left: anchor(left);
        right: anchor(right);
      }
    }
  }

  li {
    position: relative; 
    z-index: 1;
    cursor: pointer;

    a {
      padding: 1.2rem;
      text-decoration: none;
      color: inherit;
      display: block;
      height: 100%;
      width: 100%;
      transition: all 0.3s ease;

      &:before {
        content: attr(data-text);
        padding: 0 1px;
        display: block;
        font-weight: 600;
        height: 0;
        overflow: hidden;
        visibility: hidden;
      }

      &.active,
      &:hover {
        font-weight: bold;
      }

      &.active {
        anchor-name: --hovered-link;
        border-bottom: 2px solid currentColor;
      }
    }
  }

  &.unloaded ul:after{
    transition: none;
  }
}
</style>