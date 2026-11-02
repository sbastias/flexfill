<script setup>
const props = defineProps({
  weekending: {
    type: String,
    required: true
  },
  folders: {
    type: Array,
    required: true
  }
})

const weekending = new Date(props.weekending)
const expanded = ref(false)
const editingMode = ref(false)

const days = computed(() => {
  const startOfWeek = new Date(weekending)
  startOfWeek.setUTCDate(startOfWeek.getUTCDate() - 6)
  const result = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setUTCDate(startOfWeek.getUTCDate() + i)
    result.push(day)
  }
  return result
})

const activeDay = (day, placement) => {
  return day >= new Date(placement.AVTRRT__Start_Date__c) && day <= new Date(placement.AVTRRT__End_Date__c)
}

</script>

<template>
  <div class="timecard-week-container-wrapper">
    <div class="timecard-week-container" :class="{ expanded }">

      <h4 @click="expanded = !expanded" :class="{ expanded }">
        <UiHamburger :active="expanded" /> ENDING {{ new Date(weekending).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase() }}
      </h4>

      <div class="folders-wrapper">

        <ul class="folders-list">

          <li class="folder-header">
            <div>Candidate</div>
            <div>Job Title</div>
            <div>Site</div>
            
            <div v-for="day in days" :key="day.toISOString()" class="day" :data-dow="day.toLocaleDateString('en-US', { weekday: 'short' })">
              {{ day.toLocaleDateString('en-US', { day: 'numeric' }) }}
            </div>

            <div class="total">Total</div>
            <div>Rating</div>
            <div>Comments</div>
            <div>Status</div>
            <div>Approval</div>
            <div>
              <UiEditIcon size="1rem" :style="{ 'pointer-events': 'none' }" />
            </div>
            
          </li>

          <TimecardFolderRow 
            v-for="folder in folders" 
            :key="folder.Id" 
            class="folder-container" 
            :folder="folder" 
            :days="days"
          />

        </ul>
      </div>

    </div>
  </div>
</template>

<style lang="scss">

.timecard-week-container-wrapper {
  background: #f9f9f9;
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  border-radius: .5rem;
  overflow: hidden;

  .timecard-week-container {
    display: grid;
    grid-template-rows: auto auto;
    gap:0;
    transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    h4 {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
    }

    h4, .folder-header, .folder-container {
      padding: 1em;
      transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.expanded {
      h4 {
        margin: 0;
        background: var(--gray-50);
      }
      .folders-wrapper {
        height: auto;
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .folders-wrapper {
    overflow: hidden;
    visibility: hidden;
    min-height: 0;
    height: 0;
    opacity: 0;
    transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .folders-list {
    list-style: none;
    padding: 0;
    margin: 0; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    > li { /* header and rows! */
      display: grid;
      height: 6em;
      gap: 1rem;
      margin: 0;
      font-size: .8em;
      grid-template-columns: 2.5fr 3fr 1.25fr repeat(7, .6fr) .8fr 1fr 3fr 1.5fr .8fr .4fr;

      &.folder-header {
        height: min-content;
      }

      > div:last-child {
        justify-self: end;
      }

      > div:nth-last-child(2) {
        justify-self: center;
      }
    }
  }

  

  .folder-header {
    background: var(--gray-50);
    > div {
      text-transform: uppercase;
      font-weight: 600;
      font-family: var(--heading-font-family);
      font-size: 0.9em;
      color: var(--gray-500);
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .total {
      justify-content: center;
    }
    .day{
      flex-direction: column ;
      color: var(--gray-600);
      &:before {
        content: attr(data-dow);
        display: block;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.8em;
        color: var(--gray-300);
      }
    }

  }
    
}
</style>