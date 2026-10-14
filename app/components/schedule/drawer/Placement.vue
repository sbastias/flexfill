<script setup>
const props = defineProps({
  departments: Array,
  placement: Object,
  cancel: Function,
  save: Function
})

const emit = defineEmits(['save', 'cancel'])

const { placement } = toRefs(props)

</script>

<template>
  <div class="placement-drawer">

    <div class="placement-header">

      <h3>{{ placement.AVTRRT__Job_Title__c }}</h3>

      <b>{{ placement.Candidate_Full_Name__c }}</b>

    </div>

    <div class="form-container">

      <div>
        <label>Site</label>
        <select v-model="placement.Site__c">
          <option :value="null">Select a site</option>
          <option value="Site A">Site A</option>
          <option value="Site B">Site B</option>
          <option value="Site C">Site C</option>
        </select>
      </div>

      <div>
        <label>Department</label>
        <select v-model="placement.Department_Temp__c">
          <option :value="null">Select a department</option>
          <option v-for="department in props.departments" :key="department.Id" :value="department.Id">{{ department.Name }}</option>
        </select>
      </div>

      <div class="span-2">
        <label>Schedule</label>
        <select v-model="placement.Schedule__c">
          <option :value="null">Select a schedule</option>
          <option value="Schedule A">Schedule A</option>
          <option value="Schedule B">Schedule B</option>
          <option value="Schedule C">Schedule C</option>
        </select>
      </div>

      <div>
        <label>Start Date</label>
        <input type="date" v-model="placement.AVTRRT__Start_Date__c">
      </div>

      <div>
        <label>End Date</label>
        <input type="date" v-model="placement.AVTRRT__End_Date__c">
      </div>

    </div>

    <div class="placement-controls">

        
        <button class="alert full-width" @click="props.save">Cancel Schedule</button>
        <button class="default" @click="props.save">Save Changes</button>

        <button class="default" @click="props.cancel">Cancel</button>


    </div>
    <!--
    <pre>{{ JSON.stringify(props.departments, null, 2) }}</pre>
    <pre>{{ JSON.stringify(placement, null, 2) }}</pre>
    -->

  </div>
</template>

<style lang="scss">
.placement-drawer {

  width: 400px;
  flex-shrink: 0;
  font-size: .8rem;

  .placement-header {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .8rem;
    background: #f5f5f5;
    border-bottom: 1px solid #ccc;

    h3 {
      font-weight: 500;
    }
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;

    .span-2 {
      grid-column: span 2;
    }
  }

  .placement-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    padding: 1rem;
    border-top: 1px solid #ccc;
    flex-direction: row;
    flex-wrap: wrap;

    button {

      &.full-width {
        grid-column: span 2;
      }
    }
  }
}
</style>