<script setup>
const props = defineProps({
  person: {
    type: Object,
    required: true
  }
})

const person = toRefs(props).person



const position = computed(() => ({ lat: person.value.AVTRRT__Lat__c, lng: person.value.AVTRRT__Lon__c }))


</script>
<template>
  <div class="person-map-container" style="width: 100%; height: 100%;">

    <h2>Candidate Location</h2>

    <p>{{ person.MailingCity }}, {{ person.MailingState }}, {{ person.MailingCountry }}</p>

    <ScriptGoogleMaps :map-options="{
        center: position,
        zoom: 9,
        width: '100%',
        mapTypeControl: false,
        streetViewControl: false,
        disableDefaultUI: true
      }">
      
      <ScriptGoogleMapsMarker
        :position="position"
      >
        <template #content>
          <div class="person-marker" :title="person.MailingCity"></div>
        </template>
      </ScriptGoogleMapsMarker>
    
    </ScriptGoogleMaps>

    </div>
</template>

<style lang="scss">
.person-map-container {
  width: 100%;
  height: 100%;

  > div {
    width: 100%!important;
  }

  h2 {
    font-size: .8rem;
    color: var(--gray-800);
    text-transform: uppercase;
  }

  p {
    font-size: .8rem;
    color: var(--gray-600);
  }

  .person-marker {
    height: 2rem;
    aspect-ratio: 12/17;
    background-image: url(~/assets/svg/marker.svg);
    background-size: cover;
    background-position: center;
    animation: bounce 1s infinite;
  }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30%);
  }
}

</style>