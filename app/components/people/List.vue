<script setup>
const props = defineProps({
  people: {
    type: Array,
    default: () => []
  }
})

const currentPerson = defineModel()

</script>

<template>
  <ul class="people-list">
    <li v-for="person in people" :key="person.fullName" @click="currentPerson = person" :class="{ active: currentPerson.Id === person.Id }">
      <div>
        <div class="person-initials">{{ person.initials || 'NA'}}</div>
      </div>
      <div class="person-item-details">
        <h4 class="person-name">{{ person.fullName }}</h4>
        <div class="person-title">{{ person.Primary_Occupation__c }}</div>
        <PeopleStars :rating="person.rating" />
      </div>
      <div>
        <PeopleAvailabilityIndicator :availability="person.AVTRRT__Candidate_Status__c" />
      </div>
    </li>
  </ul>
</template>
  
<style lang="scss">
.people-list {
  display: block;
  list-style: none;
  // padding: 0 30px 0 0;
  // margin: 0 -30px 0 0;
  margin: 0;
  padding: 0;
  min-height: 0;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 1;

  &:hover {
    overflow-y: auto;
  }

  li {
    display: grid;
    padding: 1rem;
    grid-template-columns: auto 1fr auto;
    gap: .2rem;

    &:hover {
      background: var(--gray-100);
      .stars {
        color: var(--gray-100);
      }
      .person-initials {
        background: var(--gray-300);
        color: var(--gray-600);
      }
    }

    &.active {
      background: var(--gray-200);
      .stars {
        color: var(--gray-200);
      }
      .person-initials {
        background: var(--gray-300);
        color: var(--gray-600);
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }


    .person-initials {
      font-size: .9rem;
      margin-right: 1rem;
      background: var(--gray-100);
      color: var(--gray-500);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 1px 2px var(--gray-200);
    }

    .person-item-details {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: .3rem;
      .person-name {
        font-weight: 500;
      }

      .person-title {
        font-size: 0.9rem;
        color: var(--gray-700);
      }
    }
  }
}
</style>