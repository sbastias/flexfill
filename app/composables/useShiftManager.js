

export const useShiftManager = () => {

  const Toaster = useToaster()

  const { FLEXFILL_API_URL } = useRuntimeConfig().public

  const updatingShift = ref(false)

  const updateShift = async (shiftToUpdate) => {

    shiftToUpdate.updating = true

    

    await $fetch(FLEXFILL_API_URL + '/scheduling/shift/update', {
      method: 'POST',
      body: shiftToUpdate.sfData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((data) => {
      console.log('Shift updated successfully:', data)
      shiftToUpdate.save(data)
    })
    .catch((error) => {
      console.error('Failed to update shift:', error)
      shiftToUpdate.revert()
      Toaster.activate({ message: 'Failed to update shift', status: 'error' })
    })
    .finally(() => {
      shiftToUpdate.updating = false
    })


  }

  const activateShift = async (shiftToActivate) => {
    
    // Implement the logic to activate the shift here
    if (!shiftToActivate) {
      // logic to extend placement with inactive shifts, activating this day specifically
    } else {
      shiftToActivate.updating = true
      await $fetch(FLEXFILL_API_URL + '/scheduling/shift/activate', {
        method: 'POST',
        body: shiftToActivate.sfData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        shiftToActivate.Status__c = 'Active'
        shiftToActivate.save()
      })
      .finally(() => {
        shiftToActivate.updating = false
      })
    }
  }

  const deactivateShift = async (shiftToDeactivate) => {

    console.log('Deactivating shift:', shiftToDeactivate)

    shiftToDeactivate.updating = true
    await $fetch(FLEXFILL_API_URL + '/scheduling/shift/deactivate', {
      method: 'POST',
      body: shiftToDeactivate.sfData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      shiftToDeactivate.Status__c = 'Inactive'
      shiftToDeactivate.save()
    })
    .finally(() => {
      shiftToDeactivate.updating = false
    })
  }


  const createShift = async (shiftToCreate) => {
    alert('Create shift functionality not implemented yet.')
  }

  return {
    activateShift,
    deactivateShift,
    updatingShift,
    updateShift,
    createShift
  }
}