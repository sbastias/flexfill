<script setup>
const authStore = useAuthStore()
const Toaster = useToaster()
const { FLEXFILL_API_URL } = useRuntimeConfig().public

const activeDepartmentIds = ref([...authStore.departments.map(d => d.Id)])

const {data: folders, pending, error} = useFetch(`${FLEXFILL_API_URL}/timecards`, {
  body: { departmentIds: activeDepartmentIds.value },
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authStore.accessToken}`
  },
  immediate: true
})

const weekendings = computed(() => {
  if (!folders.value) return {}
  return folders.value.filter(folder => activeDepartmentIds.value.includes(folder.Placement__r.Department_Temp__c)).reduce((acc, folder) => {
    if (!acc[folder.Weekending__c]) {
      acc[folder.Weekending__c] = []
    }
    acc[folder.Weekending__c].push(folder)
    return acc
  }, {})
})

</script>

<template>
  <main class="timecards page-container">

    <div class="centered-container">

      <div class="default-container departments-selection" v-if="authStore.departments.length">
        Departments:
        
          <label :for="`department-${department.Id}`" 
            v-for="department in authStore.departments" 
            :key="department.Id" 
            :data-Id="department.Id"
            :class="{ 'active': activeDepartmentIds.includes(department.Id) }">
            <input type="checkbox" :id="`department-${department.Id}`" :value="department.Id" class="hidden" v-model="activeDepartmentIds" />
            {{ department.Name__c }}
          </label>
        
      </div>

      <div class="timecard-weeks" v-if="weekendings && Object.keys(weekendings).length">

        <TimecardWeek v-for="(folders, weekending) in weekendings" :key="weekending" :weekending="weekending" :folders="folders" />

      </div>

      <div v-else class="default-container">
        <h4>No timecards found for the selected departments.</h4>
      </div>

    </div>
    

  </main>
</template>



<style scoped lang="scss">
.timecards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--gray-bg);
  height: 100%;

  .departments-selection {
    display: flex;
    list-style: none;
    gap: 0.5rem;
    flex-wrap: wrap; align-items: center; justify-content: flex-start;
    font-family: var(--heading-font-family);
  }
  .departments-selection label {
    cursor: pointer;
    display: inline-flex;
    gap: .3em;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    margin: 0;
    padding: 0 .3rem;
    font-size: 0.8rem;
    height: 1.4rem;
    border: 1px solid var(--gray-border);
    border-radius: 4px;
    background: var(--gray-300);
    color: var(--gray-600);

    input[type="checkbox"] {
      display: none;
    }

  }
  .departments-selection label.active {
    background: var(--primary-color);
    color: white;
    &::before {
      content: '\2713';// checkmark
      display: inline-block;
      width: auto;
      height: 1rem;
    }
  }
  .timecard-weeks {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

</style>