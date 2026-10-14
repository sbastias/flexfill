<script setup>
import vuedraggable from 'vuedraggable'

const props = defineProps({
  matches: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['update:matches', 'deselectOrder'])

const matches = toRef(props, 'matches')


// Computed getter returns prop, setter emits updated array to parent
const localMatches = computed({
  get: () => props.matches,
  set: (newValue) => emits('update:matches', newValue)
})

// Function passed to :clone="cloneMatch"
function cloneMatch(originalMatch) {
  return {
    ...originalMatch,
    // Assign a unique ID for the new calendar item so it doesn't conflict with the source candidate
    id: `event-${originalMatch.Id}-${Date.now()}`,
    // Set default/initial properties for the calendar slot
    date: null 
  }
}

</script>
<template>
  <ul class="job-order-matches-list">
    <div class="job-order-matches-list-header">
      <span>Candidate List</span>
      <UiMiniClose @click="emits('deselectOrder')" />
    </div>
    <div v-if="matches?.length">
      <vuedraggable 
        v-model="localMatches" 
        item-key="Id"
        :group="{ name: 'calendar-orders', pull: 'clone', put: false }"
        :clone="cloneMatch"
      >
        <template #item="{element: match}">
          <JobOrderMatch :key="match.Id" :match="match" class="job-order-match-container" />
        </template>
      </vuedraggable>
    </div>
    <div v-else>
      <p style="text-align: center; font-size: .8rem;">No matches found</p>
    </div>
  </ul>
</template>

<style scoped lang="scss">
  .job-order-matches-list {
    width: 100%;
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
    min-height: 0;
    height: 100%;
    overflow: auto;
    .job-order-matches-list-header {
      position: relative;
      font-size: .6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      padding: 0.5rem 0;
      text-transform: uppercase;
      font-family: var(--heading-font-family);
      color: var(--gray-600);
      padding: .4rem;
      background: var(--gray-100);
      .mini-close {
        top: 3px;
        right: 3px;
      }
    }
  }
</style>