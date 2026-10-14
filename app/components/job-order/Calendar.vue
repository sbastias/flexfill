<script setup>
const {activeMonthName, goToNextMonth, goToPrevMonth, transitionName} = useCalendar()

const {doSomething} = useJobOrder()

const props = defineProps({
  order: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const placements = computed(() => {
  return props.order?.AVTRRT__Placement__r?.records || []
})

const updateDay = (payload) => {
  console.log('Day updated:', payload)
}

</script>

<template>
  <div class="job-order-calendar">

    <div>
      <div class="calendar-header">
        
        <div><span @click="goToPrevMonth()">Prev</span></div>
        <div>{{ activeMonthName }}</div>  
        <div><span @click="goToNextMonth()">Next</span></div>
      
      </div>

        
        

        <div class="calendars-wrapper">

          <Transition :name="transitionName">
            <UiCalendar 
              :key="activeMonthName" 
              class="calendar-item"
              :items="placements"
              @update:day="(payload) => doSomething(payload)"
            />
          </Transition>

        </div>
      </div>
    </div>
  
</template>

<style lang="scss" scoped>
.job-order-calendar {
  position: relative;
  height: 100%;
  background: var(--gray-300);
  margin: 0;

  > div {

    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 2rem;
  }

  .calendar-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
    font-family: var(--heading-font-family);
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--gray-700);
    margin: 2rem 1rem;
    
  }

  .calendars-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height:100%;// Adjust to fit UiCalendar's native height
  }

  .calendar-item {
    width: 100%;
  }

  // Slide & Fade Transitions
  .slide-next-enter-active,
  .slide-next-leave-active,
  .slide-prev-enter-active,
  .slide-prev-leave-active {
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease;
  }

  // Absolute position on exit prevents vertical displacement during transition
  .slide-next-leave-active,
  .slide-prev-leave-active {
    position: absolute;
    top: 0;
    left: 0;
  }

  // Next / Forward Transitions 
  .slide-next-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }
  .slide-next-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  // Prev / Backward Transitions
  .slide-prev-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }
  .slide-prev-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>