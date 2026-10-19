<script setup>

class Placement {
  constructor ({
    Id,
    AVTRRT__Contact_Candidate__c,
    AVTRRT__Contact_Candidate__r,
    AVTRRT__Start_Date__c,
    AVTRRT__End_Date__c,
    AVTRRT__Job__c,
    state
  }) {
    this.Id = Id || `temp-id-${Math.random().toString(36)}`
    this.AVTRRT__Contact_Candidate__c = AVTRRT__Contact_Candidate__c || null
    this.AVTRRT__Contact_Candidate__r = AVTRRT__Contact_Candidate__r || null
    this.AVTRRT__Start_Date__c = AVTRRT__Start_Date__c || null
    this.AVTRRT__End_Date__c = AVTRRT__End_Date__c || null
    this.AVTRRT__Job__c = AVTRRT__Job__c || null
    this.state = state || 'pending'
  }

  toSFObject() {
    return {
      Id: this.Id,
      AVTRRT__Contact_Candidate__c: this.AVTRRT__Contact_Candidate__c,
      AVTRRT__Contact_Candidate__r: this.AVTRRT__Contact_Candidate__r,
      AVTRRT__Start_Date__c: this.AVTRRT__Start_Date__c,
      AVTRRT__End_Date__c: this.AVTRRT__End_Date__c,
      AVTRRT__Job__c: this.AVTRRT__Job__c,
    }
  }

  hasSFId () {
    return this.Id && !/^temp-id-/.test(this.Id)
  }
}
const {activeMonthName, goToNextMonth, goToPrevMonth, transitionName} = useCalendar()

const {doSomething} = useJobOrder()

const props = defineProps({
  order: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

const emits = defineEmits(['add-placement'])


const pendingPlacement = ref(null)

const placements = computed(() => {

  return [
    ...(props.order?.placements.filter(pl => pl.Id != pendingPlacement.value?.Id) || []), 
    pendingPlacement.value
  ]
  .filter(Boolean)
  .sort((a, b) => {
    if (new Date(a.AVTRRT__Start_Date__c) - new Date(b.AVTRRT__Start_Date__c) !== 0) {
      return new Date(a.AVTRRT__Start_Date__c) - new Date(b.AVTRRT__Start_Date__c)
    } else return a.AVTRRT__Contact_Candidate__r?.Name?.localeCompare(b.AVTRRT__Contact_Candidate__r?.Name)

  })
  
})


const handleDropped = (payload) => {

  let droppedEl = payload.event.added.element

  droppedEl.Id = null
  droppedEl.AVTRRT__Start_Date__c = payload.day.toISOString().substring(0, 10)
  droppedEl.AVTRRT__End_Date__c = payload.day.toISOString().substring(0, 10)

  setPendingPlacement(droppedEl)

}

const setPendingPlacement = (placement) => {

  console.log('Setting to pending placement:', placement)

  pendingPlacement.value = new Placement({
    Id: placement?.Id || null,
    AVTRRT__Contact_Candidate__c: placement?.AVTRRT__Contact_Candidate__c || null,
    AVTRRT__Contact_Candidate__r: placement?.AVTRRT__Contact_Candidate__r || null,
    AVTRRT__Start_Date__c: placement?.AVTRRT__Start_Date__c || null,
    AVTRRT__End_Date__c: placement?.AVTRRT__End_Date__c || null,
    AVTRRT__Job__c: placement?.AVTRRT__Job__c || null,
    state: 'pending'
  })

  console.log('Pending placement:', pendingPlacement.value)


  // pendingApplicants.value.push(payload.event.added.element)
}

const savePendingPlacement = () => {
  console.log('Saving pending placement:', pendingPlacement.value)

  pendingPlacement.value.state = 'saving'


  setTimeout(() => {
    pendingPlacement.value.state = 'saved'
    
    document.getElementById('placement-dialog')?.close()

    setTimeout(() => {

      emits('add-placement', pendingPlacement.value.toSFObject())
      pendingPlacement.value = null  
      
    }, 500)

  }, 1000)
  
}



</script>

<template>
  <div class="job-order-calendar">

    <transition name="fade">
    <JobOrderPlacementEditor
      v-if="pendingPlacement && pendingPlacement.state === 'pending'"
      :placement="pendingPlacement"
      @clear-pending="pendingPlacement = null"
      @save="(placement) => savePendingPlacement(placement)"
    />
    </transition>

    <div>
      <div class="calendar-header">
        
        <div><span @click="goToPrevMonth()">Prev</span></div>
        <div>{{ activeMonthName }}</div>  
        <div><span @click="goToNextMonth()">Next</span></div>
      
      </div>

        
        

        <div class="calendars-wrapper">

          <transition name="fade">
            <div class="no-order-selected" v-if="!order">
              Select a Job Order to manage roster.
            </div>
          </transition>

          <Transition :name="transitionName">
            <UiCalendar 
              :key="activeMonthName" 
              class="calendar-item"
              :from-date="order?.AVTRRT__Start_Date__c"
              :items="placements"
              @update:day="payload => handleDropped(payload)"
              @edit-placement="placement => setPendingPlacement(placement)"
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

  .no-order-selected {
    text-align: center;
    font-weight: bold;
    padding: 2rem;
    font-size: 1.2rem;
    color: var(--gray-700);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: absolute;
    inset: 0;
    z-index: 10;
    // radial gradient from semi transparent center to transparent edges, elliptical in shape, wider horizontally
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%);  
    
  }

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
    //height:100%;// Adjust to fit UiCalendar's native height
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>