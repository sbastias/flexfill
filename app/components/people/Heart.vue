<script setup>
const props = defineProps({
  liked: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['toggle'])
</script>

<template>
  <div class="heart" @click="emits('toggle')" :class="{liked}">
    <client-only>
      <div>

        <div class="heart-overlay">

          <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.78 9.94">
            <clipPath id="heart-clip">
              <path d="M3.02.19C2.29.19,1.55.42,1,.99-.11,2.13-.08,3.89,1,5.03l4.39,4.65,4.39-4.65c1.08-1.14,1.11-2.9,0-4.04C8.67-.1,6.86-.1,5.75.99l-.36.38-.36-.38C4.48.42,3.75.19,3.02.19Z"/>
            </clipPath>
            <path class="cls-1" d="M3.02.19C2.29.19,1.55.42,1,.99-.11,2.13-.08,3.89,1,5.03l4.39,4.65,4.39-4.65c1.08-1.14,1.11-2.9,0-4.04C8.67-.1,6.86-.1,5.75.99l-.36.38-.36-.38C4.48.42,3.75.19,3.02.19Z"/>
          </svg>

        </div>

      </div>


    </client-only>
  </div>
</template>

<style lang="scss">
.heart {
//aspect-ratio: 9.5106/10.4327;
line-height: 0;
width: .9em;
height: calc(.9rem * 9.5106/10.4327);
display: inline-block;
cursor: pointer;
.cls-1 {
  clip-path: url(#heart-clip);
  stroke: var(--gray-800);
  stroke-width: .1rem;
  fill: white;
}

&.liked svg {
  .cls-1 {
    fill: red;
    stroke: #900;
  }
}


}
</style>