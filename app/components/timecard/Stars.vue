<script setup>
const props = defineProps({
  rating: {
    type: Number,
    required: false
  },
  editable: {
    type: Boolean,
    required: false
  }
})

const rating = defineModel({
  prop: 'rating',
  event: 'update:rating'
})

const tempRating = ref(rating.value || 0)


const setTempRating = n => {
  if (props.editable) tempRating.value = n
}

const setRating = n => {
  // console.log('Setting rating to', n)
  // console.log(rating.value)
  if (props.editable) {
    rating.value = tempRating.value
  }
}
</script>

<template>
  <div class="stars">
    <client-only>
      <div v-for="n in 5" :key="n" class="star" @mouseover="() => setTempRating(n)" @mouseleave="() => setTempRating(rating)" @click="() => setRating(n)">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 293.46 279.1" height="100%" width="100%">
          <polygon :class="{active: tempRating >= n}" points="146.73 0 187.88 97.65 293.46 106.61 213.31 175.91 237.42 279.1 146.73 224.28 56.05 279.1 80.16 175.91 0 106.61 105.59 97.65 146.73 0"/>
        </svg>

      </div>
      

    </client-only>

    

  </div>
</template>

<style lang="scss">
  .stars {
    height: 100%;
    min-height: .5em;
    max-height: 1em;
    display: flex;
    gap: 0.1em;
    align-items: center;
    justify-content: flex-start;
    font-size: .9em;
    color: inherit;
    line-height: 1;


  .star { 
    /* mask background with star shape */
    position: relative;
    color: inherit;
    width: 1em;
    aspect-ratio: 1/.95106;

    
      
      svg {
        display: block;
        height: 100%;
        width: 100%;
        
        polygon {
          fill: white;
          stroke: black;
          stroke-width: 10px;
          &.active {
            fill: black;
          }
        }
      }

      
    

    > div {
      height: 95%;/* hide fractional container overflow */
      background: var(--gray-800);
      width: 100%;
      display: none;
      .active {
        display: block;
      }
    }
  }
}

</style>