<script setup>
const { FLEXFILL_API_URL } = useRuntimeConfig().public
const Toaster = useToaster()

const {activeStartDay, activeEndDay} = useCalendar()
const { Person } = usePerson()

const editingOrder = ref(null)
const selectedOrder = ref(null)

const editOrder = (order) => {
  let orderToEdit = JSON.parse(JSON.stringify(order))
  delete orderToEdit.AVTRRT__Job_Application__r
  editingOrder.value = orderToEdit
}

const selectOrder = (order) => {
  selectedOrder.value = order
  console.log('Selected order:', order)
}

const unsetEditingOrder = ($event) => {

  if ($event.newState == 'open') return true

  console.log('Unsetting editing order')
  setTimeout(() => {
    editingOrder.value = null
  }, 300)

  return $event.target.hidePopover()
}

const {data: orders, pending, error} = useFetch(`${FLEXFILL_API_URL}/job-order/orders`, {
  immediate: true,
  transform: (data) => {
    return data.map(order => {
      order.placements = order.AVTRRT__Placements__r?.records || []
      return order
    })
  }
})

const currentOrders = computed(() => {

  if (orders.value?.length) {
    return orders.value.filter(order => {
      if (order.AVTRRT__End_Date__c) {
        return new Date(order.AVTRRT__End_Date__c) >= activeStartDay.value && new Date(order.AVTRRT__Start_Date__c) <= activeEndDay.value
      } else {
        return new Date(order.AVTRRT__Start_Date__c) <= activeEndDay.value
      }
    })
  }
  return []

})


const addPlacementToOrder = (placement) => {

  if (!selectedOrder.value) return

  selectedOrder.value.placements = selectedOrder.value.placements || []
  if (selectedOrder.value.placements.some(pl => pl.Id === placement.Id)) {
    // delete the existing placement with the same Id
    selectedOrder.value.placements = selectedOrder.value.placements.filter(pl => pl.Id !== placement.Id)
  }

  selectedOrder.value.placements.push(placement)

  

}


const matches = computed(() => selectedOrder.value?.AVTRRT__Job_Application__r?.records.map(record => record.AVTRRT__Contact_Candidate__r && new Person(record.AVTRRT__Contact_Candidate__r)) || []) 

</script>
  
<template>
  <div class="job-orders-page page-container">

    <JobOrderForm :order="editingOrder" popover @toggle="unsetEditingOrder" />

    <div class="job-orders-ui" :class="{show: selectedOrder}">

      <div>
        <JobOrderList 
          :orders="currentOrders" 
          :pending="pending" 
          :error="error" 
          @select="selectOrder" 
          @edit="editOrder"
          :selected-id="selectedOrder?.Id" 
        />
      </div>

      <div>
        <JobOrderMatches 
        :matches="matches" 
        @update:matches="selectedOrder.AVTRRT__Job_Application__r.records = $event"
        @deselect-order="selectedOrder = null" />
      </div>

      <div>

        <div style="height: 100%;">
          
          <JobOrderCalendar :order="selectedOrder" @add-placement="(placement) => addPlacementToOrder(placement)" />

        </div>


      </div>

      

    </div>

    

  </div>
</template>





<style lang="scss">
.job-orders-page {
  height: 100%;
  min-height: 0;
  .job-orders-ui {
    height: 100%;
    display: grid;
    grid-template-columns: 250px 0 1fr;

    > div:first-child {
      border-right: 1px solid #e0e0e0;
    }

    &.show {
      grid-template-columns: 250px 250px 1fr;

      > div:nth-child(2) {
        border-right: 1px solid #e0e0e0;
      }
    }

    > div {
      position: relative;
        height: 100%;
        min-height: 0;
        
      }
      

    
  }
}
</style>