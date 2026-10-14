<script setup>
defineProps({
  selectedId: {
    type: String,
    default: null
  },
  orders: {
    type: Array,
    default: () => []
  },
  pending: {
    type: Boolean,
    default: false
  },
  error: {
    type: Object,
    default: null
  }
})

const emits = defineEmits(['select','edit'])

</script>
<template>
  <div class="job-order-list-container">
    <div v-if="pending">
      <UiLoader />
    </div>
    <div v-else-if="error">
      <p>Error loading job orders.</p>
    </div>
    
    <ul class="job-order-list" v-else>
      <div class="job-list-header">
        <span>Job Title</span>
        <span>Status</span>
      </div>
      <li v-for="order in orders" :key="order.Id" @click="emits('select', order)" :class="{active: selectedId == order.Id}">

        <div class="order-summary">
          <div class="job-title">{{ order.AVTRRT__Job_Title__c }}<br>{{ order.AVTRRT__Start_Date__c }} - {{ order.AVTRRT__End_Date__c }}</div>
          <div class="order-status">{{ order.AVTRRT__Status__c || 'Pending'}}</div>
        </div>

        <div class="edit-control" v-if="selectedId == order.Id">
          <button @click="emits('edit', order)">Edit Order</button>
        </div>
        
      </li>
    </ul>
  
  </div>
</template>

<style lang="scss">
.job-order-list-container {
  display: block;
  padding: 0;
  margin: 0;
  height: 100%;
  & * {
    //border: 1px solid #ccc; 
  }
  .job-list-header {
    font-size: .6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    padding: 0.5rem 0;
    text-transform: uppercase;
    font-family: var(--heading-font-family);
    color: var(--gray-600);
    padding: .4rem;
    background: var(--gray-100);
  }
  ul {
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: auto;
  
  li {

    padding: .4rem;
    display: block;
    border-bottom: 1px solid #e0e0e0;

    &:hover {
        background-color: #f0f0f0;
      }

      &.active {
        background-color: #e0e0e0;
      }

    .order-summary {

      display: grid;
      grid-template-columns: 1fr 70px;
      justify-content: space-between;
      padding: 0.5rem 0;
      cursor: pointer;
      font-size: .7rem;
      
      .job-title {
        font-weight: 500;
      }
      .order-status {
        text-align: right;
        font-size: .6rem;
        font-weight: 500;
        color: var(--gray-500);
        display: inline-flex;
        align-items: flex-start;
        justify-content: flex-end;
        margin-top: .1rem;
        text-transform: uppercase;
        &:after {
          content: '•';
          display: inline-block;
          margin-left: 0.1rem;
          color: var(--gray-400);
          font-size: 1.5rem;
          line-height: .6rem;
        }
      }
    
    }

    .matches {
      display: grid;
      grid-template-rows: 0fr;
    }
  }
}
}
</style>