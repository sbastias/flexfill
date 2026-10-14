<script setup>
const props = defineProps({
  order: {
    type: Object,
    default: () => ({})
  }
})

const jobOrderFormContainer = ref(null)

watch(() => props.order, (newOrder) => {
  if (newOrder) jobOrderFormContainer.value.showPopover()
})

</script>
<template>
  <div popover ref="jobOrderFormContainer" id="job-order-form">

    <div v-if="order">
        <div class="order-form-header">
          <h2>{{ order.AVTRRT__Job_Title__c }}</h2>
          <UiMiniClose target="job-order-form" />
        </div>

        <div class="order-form-container">
          <div class="span-2">
            <label>Title</label>
            <input type="text" v-model="order.AVTRRT__Job_Title__c" />
          </div>
          <div>
            <label>Title</label>
            <input type="text" v-model="order.AVTRRT__Job_Title__c" />
          </div>
          <div>
            <label>Title</label>
            <input type="text" v-model="order.AVTRRT__Job_Title__c" />
          </div>
        </div>
        {{ order }}
      </div>
  </div>
</template>

<style scoped lang="scss">
/* Base styling for the popover */
[popover] {
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  width: 95%;
  max-width: 1200px;
  
  /* Reset browser default auto-margin if you want custom positioning */
  margin: auto;

  .order-form-header {
    margin-bottom: 1rem;
  }

  .order-form-container {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    
    .span-2 {
      grid-column: span 2;
    }
  }
}

/* Optional: Backdrop styling */
[popover]::backdrop {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

/* Target the open state when the popover is active */
[popover]:popover-open {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Base element definition with transitions */
[popover] {
  /* Final closed state */
  opacity: 0;
  transform: translateY(-12px) scale(0.95);

  /* Transition all animated properties + display + overlay */
  transition: 
    opacity 0.3s ease,
    transform 0.3s ease,
    overlay 0.3s ease allow-discrete,
    display 0.3s ease allow-discrete;
}

/* Defines starting values right before the popover opens */
@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: translateY(-12px) scale(0.95);
  }
}

/* Animating the backdrop overlay */
[popover]::backdrop {
  opacity: 0;
  transition: 
    opacity 0.3s ease,
    display 0.3s ease allow-discrete,
    overlay 0.3s ease allow-discrete;
}

[popover]:popover-open::backdrop {
  opacity: 1;
}

@starting-style {
  [popover]:popover-open::backdrop {
    opacity: 0;
  }
}
</style>