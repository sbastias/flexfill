<script setup>
const props = defineProps({
  match: {
    type: Object,
    default: () => ({})
  }
})

// watch(() => props.match, (newMatch) => {
//   if (newMatch) jobOrderFormContainer.value.showPopover()
// })

</script>
<template>
  <li class="job-order-match-container">
    {{ match.AVTRRT__Contact_Candidate__r?.Name }} - {{ match.AVTRRT__Stage__c }}
  </li>
</template>

<style scoped>
  .job-order-match-container {
    padding: 0.4rem;
    border-bottom: 1px solid #e0e0e0;
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>