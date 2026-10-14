<script setup>

const props = defineProps({
  person: {
    type: Object,
    default: () => ({}),
    transform: (value) => {
      const cleaned = JSON.parse(JSON.stringify(value))
      delete cleaned.liked
      return cleaned
    }
  }
})
    // let cleanedPerson = JSON.parse(JSON.stringify(props.person))
    // delete cleanedPerson.liked

</script>

<template>
  <section class="person-folio">

    <div>

      <h2>Professional Profile</h2>

      <UiAccordion class="sub" :data="person">
        
        <template #title>Resume</template>
        
        <template #content>
          <div class="content">
            <button>Download Resume</button>
          </div>
        </template>
        
      </UiAccordion>

      <UiAccordion class="sub" :data="person">
        
        <template #title>Intake Notes</template>
        
        <template #content>
          <div class="content">
            Paragraph content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </template>
        
      </UiAccordion>

      <UiAccordion class="sub" :data="person">
        
        <template #title>Brag Notes</template>
        
        <template #content>
          <div class="content">
            Paragraph content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </template>
        
      </UiAccordion>

    </div>

    <div>
      
      <UiAccordion :data="person">
          
        <template #title>Candidate Insights</template>
        
        <template #content>
          <div class="content">
            Paragraph content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </template>
        
      </UiAccordion>

    </div>

  </section>
</template>
  
<style lang="scss">

  .person-folio {

    h2 {
      font-size: .8rem;
      color: var(--gray-800);
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
   
    > div {
      border-bottom: 2px solid var(--gray-300);
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }

    .content.centered {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
  }
</style>