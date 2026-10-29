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
    <div class="timecard-week-container" @click="expanded = !expanded" :class="{ expanded }">

      <h4><UiHamburger :active="expanded" /> ENDING {{ new Date(weekending).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase() }}</h4>

      <div class="folders-wrapper">
        <ul class="folders-list">
          <li class="folder-header">
            <div>Candidate</div>
            <div>Job Title</div>
            <div>Site</div>
            
              <div v-for="day in days" :key="day.toISOString()" class="day" :data-dow="day.toLocaleDateString('en-US', { weekday: 'short' })">
                {{ day.toLocaleDateString('en-US', { day: 'numeric' }) }}
              </div>
            
          </li>
          <li v-for="folder in folders" :key="folder.Id" class="folder-container">

              <div>{{ folder.Placement__r.AVTRRT__Contact_Candidate__r.Name }}</div>
              <div>{{ folder.Placement__r.AVTRRT__Job_Title__c }}</div>
              <div>{{ folder.Placement__r.Site__r?.Name || 'N/A' }}</div>

              
                <div v-for="day in days" 
                :key="day.toISOString()"
                class="day"
                :class="{ 'active-day': activeDay(day, folder.Placement__r) }">
                
                  {{ folder.Time_Trackings__r.records.find(tt => new Date(tt.Date__c).toDateString() === day.toDateString())?.Reported_Hours__c || 0 }}
                
                </div>
              
            
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">

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

    /* When collapsed, collapse internal vertical margins/paddings so everything scales at identical rate */
    // &:not(.expanded) {
    //   .folders-list {
    //     .folder-header {
    //       padding-top: 0;
    //       padding-bottom: 0;
    //     }
    //     .folder-container {
    //       padding-top: 0;
    //       padding-bottom: 0;
    //       margin-top: 0;
    //       margin-bottom: 0;
    //     }
    //   }
    // }
    
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
  }

  .folder-header,
  .folder-container {
    display: grid;
    gap: 0.5rem;
    margin: 0;
    font-size: .8em;
    grid-template-columns: 2fr 3fr 1fr repeat(7, 1fr);
    // transition: padding 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
    //             margin 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    .day {
      text-align: center;
      font-weight: 700;
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



  .folder-container {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
    .day {
      color: var(--gray-300);
      text-align: center;
      font-weight: 700;
    }
    .active-day {
      color: var(--gray-800);
    }
  }
}
</style>