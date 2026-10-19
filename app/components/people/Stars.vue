<script setup>
const props = defineProps({
  rating: {
    type: Number,
    required: true
  }
})

const rating = toRef(props, 'rating')

let widths = computed(() => {
  const result = []
  for (let i = 1; i <= 5; i++) {
    let starWidth = rating.value > i ? 1 : rating.value - (i - 1);

    if (starWidth < 0) {
      starWidth = 0;
    }

    result.push(starWidth)
  }
  return result
})


</script>

<template>
  <div class="stars">
    <client-only>
      <div v-for="n in 5" :key="n" class="star">

        <div class="star-overlay">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9.51" height="100%" width="100%">
            <polygon class="cls-2" points="0 3.63 0 9.51 1.91 9.51 2.73 5.99 0 3.63"/>
            <polygon class="cls-2" points="5 0 0 0 0 3.63 3.6 3.33 5 0"/>
            <polygon class="cls-2" points="1.91 9.51 8.09 9.51 5 7.64 1.91 9.51"/>
            <polygon class="cls-2" points="8.09 9.51 10 9.51 10 3.63 7.27 5.99 8.09 9.51"/>
            <polygon class="cls-2" points="5 0 6.4 3.33 10 3.63 10 0 5 0"/>  
            <path class="cls-1" d="M5,.9l1.08,2.56.08.19.21.02,2.77.23-2.1,1.82-.16.14.05.21.63,2.71-2.38-1.44-.18-.11-.18.11-2.38,1.44.63-2.71.05-.21-.16-.14L.86,3.91l2.77-.23.21-.02.08-.19,1.08-2.56h0ZM5,0l-1.4,3.33L0,3.63l2.73,2.36-.82,3.52,3.09-1.87,3.09,1.87-.82-3.52,2.73-2.36-3.6-.31L5,0h0Z"/>
          </svg>

        </div>

        <div :style="{ width: `${widths[n - 1] * 100}%` }"></div>

      </div>

      
      <span>({{ rating }})</span>
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
    color: white;
    line-height: 1;

    span {
      font-size: 0.85em;
      display: inline-block;
      align-items: center;
      justify-content: center;
      color: var(--gray-400);
      line-height: 1;
      margin-left: 0.3em;
      transform: translateY(0.2em);
    }
  

  .star { 
    // mask background with star shape
    position: relative;
    color: inherit;
    width: 1em;
    aspect-ratio: 1/.95106;

    .star-overlay {
      position: absolute;
      top: -1px;
      left: -2px;
      width: calc(100% + 4px);
      height: calc(100% + 2px);
      overflow: hidden;
      padding: 0.03em;
      display: block;
      background: transparent;
      
      svg {
        display: block;
        height: 100%;
        width: 100%;
        
        .cls-1 {
          fill: #231f20;
          stroke-width: 4px;
        }

        .cls-2 {
          fill: currentColor;
          stroke-width: 4px;
        }
      }

      
    }

    > div {
      height: 95%;//calc(100% - 0.3em);// hide fractional container overflow
      background: var(--gray-800);
    }
  }
}

</style>