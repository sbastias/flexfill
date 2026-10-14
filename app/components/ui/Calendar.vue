<script setup>
import vuedraggable from 'vuedraggable'
import moment from 'moment'

const {activeStartDay, activeEndDay} = useCalendar()


const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emits = defineEmits(['update:day'])

const currentDays = computed(() => {
  const days = []
  let day = new Date(activeStartDay.value)
  while (day <= activeEndDay.value) {

    let dayClone = new Date(day)
    days.push({
      dow: dayClone.getUTCDay(),
      date: dayClone,
      day: String(dayClone.getUTCDate()).padStart(2, '0')
    })
    day.setUTCDate(day.getUTCDate() + 1)
  }
  return days
})

const currentWeeks = computed(() => {
  const weeks = []
  let week = []
  currentDays.value.forEach((day, idx) => {

    day = new Date(day.date)
    day.dow = day.getUTCDay()

    if (idx == 0 && day.dow !== 0) {
      for (let i = 0; i < day.dow; i++) {
        week.push(null)
      }
    }

    week.push(day)

    if (day.dow === 6) {
      weeks.push(week)
      week = []
    }

    if (idx == currentDays.value.length - 1 && day.dow !== 6) {
      for (let i = day.dow + 1; i <= 6; i++) {
        week.push(null)
      }
    }
  })
  if (week.length > 0) {
    weeks.push(week)
  }
  return weeks
})

// Returns array of tasks matching a specific day's date string
function getItemsForDay(date) {
  return props.items.filter(item => date >= new Date(item.AVTRRT__Start_Date__c) && date <= new Date(item.AVTRRT__End_Date__c))
}

// Handle task dropped onto a day cell
function handleDrop(day, event) {
  if (event.added) {
    emits('update:day', {
      day,
      event
    })
    // Emit task ID and new date string to parent component/API
    // emit('update-task-date', {
    //   taskId: task.id,
    //   newDate: dayDateStr
    // })
  }
}
</script>

<template>

<div class="ui-calendar-wrapper">

  <div class="calendar-body" item-key="date" :list="currentDays">
      
      <template v-for="(week) in currentWeeks">
        
        <div v-for="(day, dIdx) in week" :key="dIdx">
          <div class="day-cell" v-if="day" :data-day="day.getUTCDate()">
            
            <vuedraggable
            :model-value="getItemsForDay(day)" 
            group="calendar-orders"
            item-key="id"
            animation="200"
            class="drag-area"
            @change="(e) => handleDrop(day, e)"
          >
            <template #item="{ element }">
              <div class="placement-card">
                {{ element.AVTRRT__Contact_Candidate__r?.Name }}
              </div>
            </template>
          </vuedraggable>
          </div>
        </div>
      </template>
  
    </div>
</div>
</template>

<style lang="scss" scoped>

  .calendar-body {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    padding: 1rem;
    position: absolute;
    gap: .5rem;
  }
  .day-cell {
    overflow: hidden;
    width: 100%;
    position: relative;
    aspect-ratio: 1/1;
    border-radius: .5rem;
    background: white;
    padding: 1.2rem 0.2rem 0.2rem;
    text-align: center;
    &:before {
      content: attr(data-day);
      display: block;
      padding: .4rem;
      position: absolute;
      top: 0;
      right: 0;
      font-family: var(--heading-font-family);
      font-weight: 500;
      color: var(--gray-400);
      font-size: 0.8rem;
    }

    .placement-card {
      margin: .1rem;
      border-radius: 9999em;
      background: var(--gray-400);
      padding: .1rem .5rem;
      display: flex;
      justify-content: flex-start;
      color: white;
      font-size: 0.8rem;
    }

    &:hover {
      &:before {
        color: var(--gray-700);
      }
    }
  }

</style>