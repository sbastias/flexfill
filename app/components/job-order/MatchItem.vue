<script setup>
const { Person } = usePerson()

const props = defineProps({
  match: {
    type: Object,
    default: () => ({})
  }
})

const match = ref(new Person(props.match))

</script>

<template>
  <div class="match-item">

    <div class="match-header">
      
      <div>
        
        <h4>{{ match.fullName }}</h4>
        <div class="title">{{ match.Primary_Occupation__c }}</div>
        <div style="display: flex;margin-top: .5em;gap: .5em; align-items: flex-end;">
          <PeopleHeart :liked="match.liked" @toggle="() => match.toggleLike()" />
          <PeopleStars :rating="match.rating" />
        </div>

      </div>

      <PeopleAvatar :src="match.avatarUrl" />

      
    </div>

    <div class="match-ctas">
      <button>Interview</button>
      <button>Roster</button>
      <button>Reject</button>
    </div>

  </div>
</template>
  
<style lang="scss">

  .match-item {
    font-size: .8em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5em;
    margin: 1em 0.5em;
    padding: 1em;
    background: var(--gray-50);
    border-radius: 0.5em;
    border: 1px solid var(--gray-300);
    .stars {
      color: var(--gray-50);
    }

    .match-header {
      display: grid;
      grid-template-columns: 1fr auto;
      
      
      gap: 1rem;

      .title {
        margin: .3rem 0;
        font-size: 0.7rem;
        color: var(--gray-600);
      }

    }

    .match-ctas {
      display: flex;
      flex-direction: column;
      gap: .6em;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.7em;

      button {
        
        display: inline-block;
        height: auto;
        padding: 0.7em 3em;
        border-radius: 9999em;
        cursor: pointer;
        font-family: 'Work Sans', sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        font-size: .7em;
        border-color: var(--gray-300);
        color: var(--gray-600);

        &:hover {
          color: var(--primary-color);
          border-color: currentColor;
          background:hsl(from currentColor h s l / 0.05);
        }

      }
    }
  }

</style>