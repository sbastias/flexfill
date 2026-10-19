<script setup>
const { FLEXFILL_API_URL } = useRuntimeConfig().public
const { controller } = useController()
const { Person } = usePerson()




const contactId = ref(123)
const currentPerson = ref(null)

const {data: peopleRaw, execute, pending, status} = await useLazyFetch(() => `${FLEXFILL_API_URL}/people/${contactId.value}`, {
  watch: [contactId],
  method: 'GET',
  deep: true,
  lazy: true,
  signal: controller.value.signal, // Reactive getter for signal
  headers: { 'Content-Type': 'application/json' },
  immediate: true
})



// Local class conversion
const people = computed(() => (peopleRaw.value ?? []).map(p => new Person(p)))


// const people = computed(() => (peopleRaw.value ?? []).map(person => new Person(person)))



onMounted(() => {
  // setTimeout(() => {
  //   execute()
  // }, 2000)
})



watch(
  people,
  (newPeople) => {
    if (newPeople?.length && !currentPerson.value) {
      currentPerson.value = newPeople[0] ?? null
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="people-page page-container">

    <div class="populated" v-if="!pending">
      <PeopleList 
        :people="people" 
        :pending="pending" 
        v-model="currentPerson" />

      <div style="z-index: 2; background: white;">
          <template v-if="currentPerson">
            <PeoplePerson :person="currentPerson" />
          </template>
      </div>

    </div>

    <div class="loading" v-else>
      <UiLoader />
    </div>

  </div>
</template>

<style lang="scss">
.people-page {

  height: 100%;

  > div.populated {
    display: grid;
    height: 100%;
    grid-template-columns: 28ch 1fr;
  }
}
</style>