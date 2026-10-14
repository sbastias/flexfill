<script setup>
const { FLEXFILL_API_URL } = useRuntimeConfig().public

const props = defineProps({
  person: {
    type: Object,
    default: () => ({})
  }
})

const person = toRef(props, 'person')


const {data: personData, pending, error} = await useFetch(() => `${FLEXFILL_API_URL}/people/person/${props.person.Id}`, {
  contentType: 'application/json',
  method: 'GET',
  immediate: true,
  watch: [props.person]
})


</script>

<template>
  <div class="person-details">

    <PeoplePersonHeader :person="person" />
    
    <section class="person-details-map">
      <PeoplePersonFolio
        v-if="personData"
        :person="personData"
       />
      <PeoplePersonMap
        v-if="personData"
        :person="personData"
      />
    </section>

  </div>
</template>
  
<style lang="scss">
.person-details {

  max-width: 1200px;
  padding: 2rem;
  margin: 0 auto;


  .person-details-map {
    border-top: 2px solid var(--gray-300);
    padding-top: 1rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    > * {
      flex: 1;
      overflow: hidden;
    }
  }
}

</style>