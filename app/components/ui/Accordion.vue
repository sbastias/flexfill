
<script setup>

const accordion = ref(null)
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const toggleContents = () => {
  accordion.value.classList.toggle('open')
}

watch(() => props.data, (newVal) => {

  //console.log('Accordion data changed:', newVal)
  accordion.value.classList.add('no-transition')
  
  setTimeout(() => {
    accordion.value.classList.remove('open')
    
    setTimeout(() => {
      accordion.value.classList.remove('no-transition')
    }, 100)

  }, 100)
})

</script>

<template>
  <div class="ui-accordion" ref="accordion">
    <div class="accordion-title" @click="toggleContents">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="transition: transform 0.18s; flex-shrink: 0;"><path d="M3 2l5 4-5 4" stroke="#374151" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      <span><slot name="title"></slot></span>
    </div>
    <div class="accordion-content-wrapper">
      <div class="accordion-content">
        <div>
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.ui-accordion {

  & * {

  }

  &.sub{
    margin-left: 1rem;

    padding-top: 1rem;
    &:not(:last-child) {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--gray-300);
    }
  }
  
  .accordion-title {
    font-family: var(--heading-font-family);
    text-transform: uppercase;
    font-weight: bold;
    color: var(--gray-800);
    font-size: .8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &.sub .accordion-title {
    font-family: 'Inter', sans-serif;
    text-transform: none;
    font-weight: 800;
    color: var(--gray-800);
    font-size: .9rem;
  }
  
  .accordion-content-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease-out;
    overflow: hidden;
    min-height: 0px;

    .accordion-content {
      min-height: 0px;
      > div {
        padding: 2rem;
        font-size: .9rem;
      }
    }
  }
  &.open {
    .accordion-title {
      svg {
        transform: rotate(90deg);
      }
    }
    .accordion-content-wrapper {
      grid-template-rows: 1fr;
    }
  }

  &.no-transition {
    .accordion-content-wrapper {
      transition: none !important;
    }
  }
}
</style>
