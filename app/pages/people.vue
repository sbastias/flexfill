<script setup>
const { FLEXFILL_API_URL } = useRuntimeConfig().public
const { controller } = useController()


class Person {
  constructor({ 
    Id,
    FirstName, 
    LastName, 
    Primary_Occupation__c,
    AVTRRT__Lat__c,
    AVTRRT__Lon__c,
    MailingCity,
    MailingState,
    MailingCountry,
    AVTRRT__Candidate_Status__c
   }) {
    this.Id = Id,
    this.FirstName = FirstName
    this.LastName = LastName
    this.Primary_Occupation__c = Primary_Occupation__c
    this.AVTRRT__Lat__c = AVTRRT__Lat__c
    this.AVTRRT__Lon__c = AVTRRT__Lon__c
    this.MailingCity = MailingCity
    this.MailingState = MailingState
    this.MailingCountry = MailingCountry
    this.AVTRRT__Candidate_Status__c = AVTRRT__Candidate_Status__c
    this.rating = Math.round((Math.random() * 5) * 2) / 2 // random rating rounded to nearest quarter
    this.liked = false
  }


  get initials () {
    return `${this.FirstName?.[0] || ''}${this.LastName?.[0] || ''}`.toUpperCase()
  }

  get fullName () {
    return `${this.FirstName || ''} ${this.LastName || ''}`.trim()
  }

  toggleLike () {
    this.liked = !this.liked
  }
  
}


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