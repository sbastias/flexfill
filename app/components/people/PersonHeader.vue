<script setup>

const props = defineProps({
  person: {
    type: Object,
    default: () => ({})
  }
})

const person = toRef(props, 'person')

</script>

<template>
  <section class="person-header">

    <div class="person-header-left">
      
      <PeopleAvatar />
      
      <div>
        <h4>{{ person.fullName }}</h4>
        <div class="title">{{ person.Primary_Occupation__c }}</div>
        <div style="display: flex;margin-top: .5rem;gap: .5rem; align-items: flex-end;">
          <PeopleHeart :liked="person.liked" @toggle="() => person.toggleLike()" />
          <PeopleStars :rating="person.rating" />
        </div>
        <div>
          
        </div>
      </div>

      <div class="score-container">
        <span class="score-value">
          0%
        </span>
        <span class="score-title">
          Employment<br>Stability<br>Score
        </span>
      </div>

      <div class="score-container">
        <span class="score-value">
          0%
        </span>
        <span class="score-title">
          Occupational<br>Quality<br>Assessment
        </span>
      </div>
      
    </div>

    <div class="person-header-right">
      <button>Interview</button>
      <button>Roster</button>
      <button>Reject</button>
    </div>

  </section>
</template>
  
<style lang="scss">

  .person-header {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: var(--gray-50);
    border-radius: 0.5rem;
    border: 1px solid var(--gray-300);

    .stars {
      color: var(--gray-100);
    }

    .person-header-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;

      .title {
        margin: .3rem 0;
        font-size: 0.7rem;
        color: var(--gray-600);
      }

      .score-container {
        display: inline-block;
      
        .score-value {
          font-size: 2rem;
          font-weight: bold;
          font-family: var(--heading-font-family);
          width: 100%;
          display: block;
          line-height: 1;
        }

        .score-title {
          display: block;
          font-size: .6rem;
          font-weight: normal;
          color: var(--gray-600);
          line-height: 1.2;
        }

      }
    }

    .person-header-right {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      justify-content: flex-end;

      button {
        display: inline-block;
        height: auto;
        padding: 0.5rem 3rem;
        border-radius: 9999em;
        cursor: pointer;
        font-family: 'Work Sans', sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        font-size: .7rem;
        border-color: var(--gray-300);
        color: var(--gray-600)
      }
    }
  }

</style>