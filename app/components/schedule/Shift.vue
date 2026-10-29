<script setup>
class Shift {
  constructor(shiftObj, date) {
    this.Id = shiftObj.Id || null
    this.Type__c = shiftObj.Type__c || ''
    this.Status__c = shiftObj.Status__c || 'blank'
    this.Date__c = shiftObj.Date__c || date
    this.saved = false
    this.updating = false
    this.lastVersion = shiftObj && {
      Id: shiftObj.Id || null,
      Type__c: shiftObj.Type__c || '',
      Status__c: shiftObj.Status__c || 'blank',
      Date__c: shiftObj.Date__c || date
    } || null
  }

  get sfData () {
    return {
      Id: this.Id,
      Type__c: this.Type__c,
      Status__c: this.Status__c,
      Date__c: this.Date__c
    }
  }

  save (newVersion) {

    if (newVersion) {
      this.lastVersion = newVersion
      this.Id = newVersion.Id || null
      this.Type__c = newVersion.Type__c || ''
      this.Status__c = newVersion.Status__c || 'blank'
      this.Date__c = newVersion.Date__c || null
    }
    this.saved = true
    setTimeout(() => {
      this.saved = false
    }, 2000)
  }

  revert () {
    if (this.lastVersion) {
      console.log('reverting to last version', this.lastVersion)
      this.Id = this.lastVersion.Id || null
      this.Type__c = this.lastVersion.Type__c || ''
      this.Status__c = this.lastVersion.Status__c || 'blank'
      this.Date__c = this.lastVersion.Date__c || null
    }
  }
}

//const {data} = defineProps(['data'])
const { data } = defineProps(['data'])
const shift = ref(null)
const shiftoptions = ref(null)
const hovered = ref(false)

let hoverTimeout = null

const doHover = () => { 
  
  hovered.value = true 
  hoverTimeout =setTimeout(() => {
    shiftoptions.value.classList.add('hovered')
  }, 10)
  
}

const undoHover = () => { 
  clearTimeout(hoverTimeout)
  hovered.value = false 
  try {
    //console.log('undoHover called', shift.value)
    shiftoptions.value.classList.remove('hovered')
    if (unsaved.value) shift.value.revert()
  } catch (e) {
    // ignore
  }
}


const editingOptions = ref(false)
const waiting = ref(false)

const { updateShift, activateShift, deactivateShift, createShift } = useShiftManager()

onMounted(() => {
})

const unsaved = computed(() => shift.value && (JSON.stringify(shift.value.lastVersion) != JSON.stringify(shift.value.sfData) ))



watch(() => data, (newVal) => {

  shift.value = new Shift(newVal.shift || {}, data.date)

}, { immediate: true })

</script>


<template>

  <div v-if="shift" 
    class="slot-wrapper" 
    :class="{ 'is-past': data.isPast && new Date(shift.Date__c) < new Date() }"
    @mouseenter="doHover"
    @mouseleave="undoHover">  

    <div 
      class="slot" 
      :class="[
        shift.Type__c.toLowerCase(), 
        shift.Status__c.replace(/ /g, '-').toLowerCase(), 
        {
          updating: shift.updating, 
          saved: shift.saved
        }
        ]">
    </div>

    <div class="shift-options-container" :class="{suppressed: shift.updating}" ref="shiftoptions" v-if="hovered">

      <div class="shift-options">

        <!--div>
          <pre>{{ shift.sfData }}</pre>
        </div>

        <div>
          <pre>{{ shift.lastVersion }}</pre>
        </div>

        <div>{{ unsaved }}</div-->

        <div class="shift-date">{{ new Date(shift.Date__c).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'utc' }).replace(/,/g, '') }}</div>

        <!--pre>{{ JSON.stringify(shift, null, 2) }}</pre-->

        <div class="options-area" v-show="shift.Status__c == 'Active'">
          <select v-model="shift.Type__c" data-lpignore="true">
            <option value="Day">Day</option>
            <option value="Night">Night</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: .3rem" v-if="shift.Id">
          <template v-if="shift.Status__c === 'Active'">
            <button @click="updateShift(shift)" :disabled="!unsaved">Save Changes</button>
            <button @click="deactivateShift(shift)">Deactivate</button>
          </template>
          <template v-else>
            <button @click="activateShift(shift)">Activate</button>
          </template>
        </div>
        <div style="display: flex; justify-content: center;" v-if="!shift.Id">
          <button @click="createShift(shift)">Activate</button>
        </div>

      </div> <!-- Close shift-options -->
      
    </div>

  </div>
</template>


<style scoped lang="scss">
.slot-wrapper {
  box-sizing: border-box;
  position: relative;
  padding: .5rem .05rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.is-past {
    cursor: not-allowed;

    .slot {
      opacity: 0.4;
      pointer-events: none;
    }

  }

  .shift-options-container {
    position: absolute;
    top: 90%; /* Restored original vertical alignment */
    display: block;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    .shift-options {
      font-size: .75em;
      &:before {
        content: '';
        display: block;
        height: 1rem;
        width: 1rem;
        position: absolute;
        top: 0;
        left: 50%;
        border: 1px solid #ccc;
        border-right: none;
        border-bottom: none;
        background: white;
        transform-origin: 50% 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
      background: white;
      border: 1px solid #ccc;
      border-radius: .6rem;
      #{"corner-shape"}: squircle;
      padding: .5rem;
      z-index: 3;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 20ch;
    }

    /* DEFAULT / MOUSE LEAVE: 
       Fade out smoothly over 0.3s, hide visibility instantly (0s delay) */
    transition: 
      opacity 0.3s ease 0s,
      visibility 0s linear 0.3s,
      pointer-events 0s linear 0.3s;

    .shift-date {
      text-transform: uppercase;
      font-size: .8em;
      text-align: center;
      font-weight: 500;
      margin-bottom: .3rem;
      white-space: nowrap;
      text-transform: uppercase;
    }

    .options-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .3rem;
      margin: .8rem 0;
    }

    button {
      white-space: nowrap;
    }
  }

  /* HOVER OR EDITING STATE */
  &:hover:not(.is-past) {
    z-index: 10;
    .slot:hover {
      opacity: 1;
      scale: 1.1;
    }
  }

  .shift-options-container.hovered:not(.suppressed) {
    opacity: 1;
    visibility: visible;
    
    /* MOUSE OVER / FADE IN:
        1. opacity waits 1s delay, then fades in over 0.3s
        2. visibility turns on at 1s (when fade begins)
        3. pointer-events turns auto at 1.3s (when fade completes) */
    pointer-events: auto;
    transition: 
      opacity 0.3s ease .5s,
      visibility 0s linear .5s,
      pointer-events 0s linear .8s;
  }

  .slot {

    

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: .4rem;
    #{"corner-shape"}: squircle;
    border: 1px solid #ccc;
    opacity: 0.6;
    transition: scale 0.3s ease, opacity 0.3s ease;
    position: relative;
    cursor: pointer;
    overflow: hidden;

    &.active {

      color: white;
      font-size: .7rem;
      font-weight: 600;

      &.day{
        background: var(--gray-500);
        background: var(--day-bg);
        &:before {content: 'DS'}
      }
      &.night{
        background: var(--gray-800);
        background: var(--night-bg);
        &:before {content: 'NS'}
      }
    }

    &.inactive {
      background: var(--gray-300);
    }


    &.active.updating,
    &.inactive.updating {
      --bg: #fff; /* match the element's background */
      border: 1px solid transparent;
      border-radius: 12px;
      background:
      linear-gradient(var(--bg), var(--bg)) padding-box,
      conic-gradient(from var(--angle), #6366f1, #ffffff, #8e71d0, #ffffff,#6366f1) border-box;
      animation: spin-border 1s linear infinite;
      opacity: 1;
    }

    

    &.saved {
      border: 1px solid green;
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: lightgreen;
        color: white;
        content: '\2713'; /* Unicode check mark */
        animation: fade-out 1s forwards 1s;
      }
    }
  }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-border {
  to { --angle: 360deg; }
}
</style>