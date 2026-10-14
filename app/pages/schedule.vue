<script setup>
const {FLEXFILL_API_URL} = useRuntimeConfig().public
const Toaster = useToaster()
const mainStore = useMainStore()
const { controller } = useController()
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class SlotData {
  constructor({Id = null, Date__c = null}) {
    this.Id = Id
    this.rawDate = new Date(Date__c)
  }

  get Date__c () {
    return this.rawDate.toISOString()
  }

  get sfObject() {
    return {
      Id: this.Id,
      Date__c: this.Date__c
    }
  }
}


class Placement {

  constructor({
    Id = null, 
    AVTRRT__Job_Title__c = '', 
    AVTRRT__Start_Date__c = null, 
    AVTRRT__End_Date__c = null, 
    Candidate_Full_Name__c = '', 
    Department_Temp__c = null,
    Site__c = null,
    Rotation_Communication__c = null,
    AVTRRT__Job_Applicant__r = {
      Department__c: null,
      Department__r: {
        Name: ''
      }
    },
    shifts = [],
    slots = []
  }) {
    this.Id = Id
    this.AVTRRT__Job_Title__c = AVTRRT__Job_Title__c
    this.Candidate_Full_Name__c = Candidate_Full_Name__c
    this.AVTRRT__Start_Date__c = AVTRRT__Start_Date__c
    this.AVTRRT__End_Date__c = AVTRRT__End_Date__c
    this.startDate = new Date(AVTRRT__Start_Date__c)
    this.endDate = new Date(AVTRRT__End_Date__c)
    this.Department_Temp__c = AVTRRT__Job_Applicant__r?.Department__c || null
    this.Site__c = Site__c
    this.Rotation_Communication__c = Rotation_Communication__c
    this.AVTRRT__Job_Applicant__r = AVTRRT__Job_Applicant__r
    this.shifts = shifts
    this.slots = slots
  }

  get sfObject() {
    return {
      Id: this.Id,
      AVTRRT__Job_Title__c: this.AVTRRT__Job_Title__c,
      AVTRRT__Start_Date__c: this.startDate.toISOString().substring(0,10),
      AVTRRT__End_Date__c: this.endDate.toISOString().substring(0,10),
      Candidate_Full_Name__c: this.Candidate_Full_Name__c,
      Department_Temp__c: this.Department_Temp__c,
      Site__c: this.Site__c,
      Rotation_Communication__c: this.Rotation_Communication__c,
      Department_Temp__c: this.Department_Temp__c,
      Site__c: this.Site__c,
      slots: this.slots
    }
  }
}

const placements = computed(() => data.value?.placementRecords?.map(p => new Placement(p)) || [])
const departments = computed(() => data.value?.departments || [])
const editingPlacement = ref(null)
const drawerState = ref('closed')
const contactId = ref(null)
  
  
  const today = computed(() => {
    return new Date().toISOString().substring(0, 10)
  })

  const loadedDates = computed(() => {
      const now = new Date()
      const year = now.getUTCFullYear()
      const month = now.getUTCMonth()

      // Start: 1st of previous month
      let current = new Date(Date.UTC(year, month - 1, 1))
      // End: last day of 4 months ahead
      const end = new Date(Date.UTC(year, month + 5, 0))

      const dates = []

      while (current <= end) {
        // Store formatted string "YYYY-MM-DD" instead of mutable Date object
        dates.push(current.toISOString().substring(0, 10))
        current.setUTCDate(current.getUTCDate() + 1)
      }

      return dates
  })

  const loadedMonths = computed(() => {

    let months = loadedDates.value.map(d => {
      const [year, month] = d.split('-')
      return {
        year: parseInt(year),
        month: parseInt(month),
        monthName: MONTHS[parseInt(month) - 1]
      }
    }).filter((v, i, a) => a.map(m => m.year + '-' + m.month).indexOf(v.year + '-' + v.month) === i)
    
    return months
    
  })

  const rangeEnd = computed(() => {
    return loadedDates.value.length ? loadedDates.value[loadedDates.value.length - 1] : null
  })

  
  const editPlacement = (placement) => {

      // if (this.editingPlacement) return

      editingPlacement.value = placement
      drawerState.value = 'open'

    }

  const cancelEdit = () => {
    drawerState.value = 'closed'

    setTimeout(() => {
      editingPlacement.value = null
    }, 1000)

  }

  const saveEdit = () => {
    drawerState.value = 'closed'

    setTimeout(() => {
      editingPlacement.value = null
    }, 1000)

  }

  const {data, execute, pending, status} = await useFetch(() => `${FLEXFILL_API_URL}/scheduling/placements`, {
    watch: [today, rangeEnd, contactId],
    body: computed(() => ({ from: today.value, to: rangeEnd.value, contactId: contactId.value })),
    method: 'POST',
    deep: true,
    lazy: true,
    immediate: true,
    signal: controller.value.signal, // Reactive getter for signal
    headers: { 'Content-Type': 'application/json' }
  })
      
    
onMounted(() => {
  document.documentElement.style.background = '#fff';
})

  const completed = computed(() => status.value === 'success')

</script>

<template>
  <div class="scheduling-ui page-container">


    <section class="drawer-grid" :class="[`drawer-${drawerState}`]">

      <div class="drawer">

        <ScheduleDrawerPlacement 
          v-if="editingPlacement"
          :placement="editingPlacement" 
          :departments="departments" 
          :save="saveEdit" 
          :cancel="cancelEdit" 
        />

      </div>

      

      <div class="right-side">

        <client-only>

          <div v-if="completed">

            <table>          
              
                <thead class="months">
                  <tr>
                    <th class="mask"></th>
                    <th v-for="month in loadedMonths" :key="month.year + month.monthName" :colspan="loadedDates.filter(d => d.substring(0,7) === `${month.year}-${month.month.toString().padStart(2,'0')}`).length" class="month-header-cell">
                      <span class="month-header">{{month.monthName}} {{month.year}}</span>
                    </th>
                  </tr>
                </thead>

                <thead class="dates">
                  <tr>
                    <th class="mask"></th>
                    <template v-for="(month) in loadedMonths">
                      <th v-for="(day, idx2) in loadedDates.filter(d => d.substring(0,7) === `${month.year}-${month.month.toString().padStart(2,'0')}`)" :key="month.year + month.monthName + idx2" :class="{'first-day-of-month': day.substring(8,10) === '01', 'today': day === today}">
                        <span class="day-header">{{parseInt(day.substring(8,10))}}</span>
                      </th>
                    </template>
                  </tr>
                </thead>

              
                <tbody v-for="placement in placements" :key="placement.Id">
                  <tr>
                    <td class="placement-title-cell">
                      <div class="placement-title" @click="editPlacement(placement)">
                        <span class="job-title">{{placement.AVTRRT__Job_Title__c}}</span>
                        <!--span class="start-end">{{placement.AVTRRT__Start_Date__c}} - {{placement.AVTRRT__End_Date__c}}</span-->
                        <span class="candidate-name">{{placement.Candidate_Full_Name__c}}</span>
                      </div>
                      <div class="edit-icon-container">
                        <UiEditIcon :active="editingPlacement && editingPlacement.Id === placement.Id" />
                      </div>
                    </td>
                    <td class="day-slot-cell" v-for="(day) in loadedDates" :key="day" :class="{'first-day-of-month': day.substring(8,10) === '01', 'today': day === today, 'is-past': new Date(day) < new Date()}">
                      <ClientOnly>
                        <ScheduleShift :data="{placementId: placement.Id, shift: placement.shifts?.find(s => s.Date__c === day) || null, isPast: new Date(day) < new Date(), date: day}" />
                      </ClientOnly>
                    </td>
                  </tr>
                </tbody>

            </table>

          </div>

          <div v-else>
            <UiLoader />
          </div>

        </client-only>

      </div>

      

    </section>

    <!--section>
      <pre>
        {{ JSON.stringify(loadedDates, null, 2) }}
      </pre>
      <pre>
        {{ JSON.stringify(placements, null, 2) }}
      </pre>
    </section-->

  </div>
</template>





<style scoped lang="scss">
body {
  background: #fff;
}

.scheduling-ui {

  
  padding: 2rem 0 0;
  height: 100%;
  width: 100%;


  .shift-options {
    padding: 1rem;
    background: #f5f5f5;
    //anchor-position: top right;
  }

  .drawer-grid {

    display: grid;
    grid-template-columns: 0 100%;
    gap: 0;
    transition: grid-template-columns 1s cubic-bezier(0.22, 1, 0.36, 1);

    &.drawer-open {
      grid-template-columns: 400px calc(100% - 400px);
    }
    
  }

  table {
    display: block;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    position: relative;
    border-collapse: collapse; 

    /* Standard property for Firefox */
    scrollbar-width: none;

    /* Legacy property for Internet Explorer / Edge */
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    thead {
      background: white;
      position: sticky;
      z-index: 2;

      &:first-child {
        top: 0;
        height: 1.5rem;
      }
      &:nth-child(2) {
        top: 1.5rem;
      }

      .day-header {
        color: #aaa;
        font-size: .8rem;
      }
    }

    th:not(:first-child), td:not(:first-child) {
      border-left: 1px solid #ccc;
      &.first-day-of-month,
      &.month-header-cell {
        border-left: 2px solid #888;
      }

      &.today:not(td) {
        background: #dbeafe;
        .day-header {
          color: #2563eb;
        }
      }
    }
  

    tbody:nth-child(odd) tr {
      background-color: #f9f9f9;
    }
    tbody:nth-child(even) tr {
      background-color: #ffffff;
    }

    tr {
      position: relative;
      background: inherit;
    }

    th, td {
      height: 1px;// hack to force correctheight on contained 100% divs
      position: relative;
    }
  }
  .mask, .placement-title-cell {
    position: sticky;
    left: 0;
    background-color: inherit;
    z-index: 1;

    .edit-icon-container {
      position: absolute;
      bottom: .4rem;
      right: .4rem;
    }
  } 

  .month-header-cell {
    text-align: left;
    .month-header {
      display: inline-block;
      font-weight: 600;
      font-size: 1rem;
      position: sticky;
      left: 250px;
      padding: 0 .5rem .5rem;
    }
  }

  .placement-title-cell {
    width: 250px;
  }

  .placement-title {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    padding: .5rem;
    max-width: 250px;
    .job-title, .candidate-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
    .job-title {
      font-weight: 600;
      font-size: .9rem;
    }
    .start-end {
      font-weight: 500;
      font-size: 0.6rem;
    }
    .candidate-name {
      font-weight: 400;
      font-size: 0.7rem;
    }
  }
  .day-slot-cell {
    min-width: 30px;
    position: relative;
    &.is-past:not(.today) {
      z-index: 0;
      &:before {
        pointer-events: none;
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: #ccc;
        opacity: 0.5;
        mix-blend-mode: multiply;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }
    }
    &.today {
      background: linear-gradient(to left, rgba(37, 99, 235, 0.06) 49%, blue 48%, blue 52%, rgba(37, 99, 235, 0.06) 51%);
      &:before {
        pointer-events: none;
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        // background: linear-gradient(to left, rgba(37, 99, 235, 0.5) 49%, blue 49%, blue 51%, rgba(37, 99, 235, 0.5) 51%);
        // mix-blend-mode: overlay;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

}

</style>