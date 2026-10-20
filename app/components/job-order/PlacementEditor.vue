<script setup>
const props = defineProps({
  placement: {
    type: Object,
    required: true,
    default: () => ({})
  },
  fromDate: {
    type: String,
    required: false
  },
  toDate: {
    type: String,
    required: false
  }
})

const emits = defineEmits(['clear-pending', 'save'])

const placementDialog = ref(null)

watch(() => props.placement, (newVal, oldVal) => {
  // console.log('Placement changed:', newVal)
  // if (newVal) placementDialog.value.showModal()
  // else placementDialog.value.close()
  console.log('Placement changed:', newVal)
  nextTick(() => {
    
    if (newVal) {
      placementDialog.value.showModal()

      //placementDialog.value.addEventListener('close', doCloseStuff)
    }
  })
  
}, { immediate: true })


// const doCloseStuff = () => {
//   console.log('Placement dialog closed')
//   placementDialog.value.close()
//   placementDialog.value.removeEventListener('close', doCloseStuff)
//   emits('clear-pending')
// }

const doSaveStuff = () => {
  console.log('Placement dialog save clicked')

  // Implement save logic here
  emits('save', props.placement)
}

</script>

<template>
  <dialog id="placement-dialog" ref="placementDialog" @close="() => emits('clear-pending')">

    <UiMiniClose @click="() => placementDialog.close()" />

    <div>
      <h3>Rostering <span>{{ placement?.AVTRRT__Contact_Candidate__r?.Name || 'Unknown' }}</span></h3>
    </div>

    <div class="form-container">
      <form>

        <div>
          <label for="start-date">Placement Date</label>
          <input type="date" id="start-date" v-model="placement.AVTRRT__Start_Date__c" :min="fromDate" />
        </div>

        <div>
          <label for="end-date">End Date</label>
          <input type="date" id="end-date" v-model="placement.AVTRRT__End_Date__c" :min="placement.AVTRRT__Start_Date__c" :max="toDate" :disabled="!placement.AVTRRT__Start_Date__c" />
        </div>

      </form>

    </div>

    <div>
      <button @click="doSaveStuff">Save</button>
    </div>
    <pre>
      {{ placement }}
    </pre>
  </dialog>
</template>

<style lang="scss">
  #placement-dialog {
    border: none;
    border-radius: 8px;
    padding: 1rem;
    background: var(--gray-100);
    width: 400px;
    max-width: 90%;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, display 0.3s allow-discrete, overlay 0.3s allow-discrete;

    &[open] {
      opacity: 1;
      transform: scale(1);
      //transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, visibility 0.3s ease-in-out allow-discrete, display 0.3s allow-discrete, overlay 0.3s allow-discrete;
    }

//     &::backdrop {
//   background-color: rgb(0 0 0 / 0%);
//   transition: 
//     background-color 0.3s ease,
//     display 0.3s allow-discrete,
//     overlay 0.3s allow-discrete;
// }

// &[open]::backdrop {
//   background-color: rgb(0 0 0 / 50%);
// }
  

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    font-weight: 600;

    span {
      color: var(--primary-color);
    }
  }

  form {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    margin: 1rem 0;
  }

  pre {
    background: var(--gray-200);
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }


}
@starting-style {
  #placement-dialog[open] {
      opacity: 0;
      transform: scale(0.95);
    }
  //   dialog[open]::backdrop {
  //   background-color: rgb(0 0 0 / 0%);
  // }
}
</style>