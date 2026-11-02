<script setup>
const props = defineProps({
  days: {
    type: Array,
    required: true
  }
})

const folder = defineModel('folder')

const placement = folder.value.Placement__r
const timeTrackings = ref(folder.value.Time_Trackings__r.records)
const editingMode = ref(false)

const activeDay = day => {
  return day >= new Date(placement.AVTRRT__Start_Date__c) && day <= new Date(placement.AVTRRT__End_Date__c)
}

const dayTT = day => {
  return timeTrackings.value.find(tt => new Date(tt.Date__c).toDateString() === day.toDateString())
}

const totalHours = computed(() => {
  return timeTrackings.value?.reduce((sum, tt) => sum + (parseFloat(tt.Reported_Hours__c) || 0), 0) || 0
})

const editRow = () => {
  editingMode.value = !editingMode.value
}

const toggleFolderApproval = () => {
  //console.log('Toggling folder approval', folder.value)
  folder.value = {...folder.value, Approved__c: !folder.value.Approved__c}

  if (folder.value.Approved__c) {
    editingMode.value = false
  }
}
</script>
<template>
  <li class="folder-container" :class="{editing: editingMode, approved: folder.Approved__c}">

      <div>{{ placement.AVTRRT__Contact_Candidate__r.Name }}</div>
      <div>{{ placement.AVTRRT__Job_Title__c }}</div>
      <div>{{ placement.Site__r?.Name || 'N/A' }}</div>

      <div v-for="day in days" 
        :key="day.toISOString()"
        class="day"
        :class="{ 'active-day': activeDay(day) }">
        <div v-if="activeDay(day) && editingMode">
          <input type="text" pattern="\d*" v-model="dayTT(day).Reported_Hours__c" />
        </div>
        <div v-else>
          {{ dayTT(day)?.Reported_Hours__c || 0 }}
        </div>
      </div>

      <div class="total">
        {{ totalHours }}
      </div>

      
      <div class="folder-rating">
        <TimecardStars :rating="folder.Rating__c" :editable="editingMode" />
      </div>

      <div class="folder-comments">
        <div v-if="editingMode">
          <input type="text" v-model="folder.Comments__c" maxlength="255" />
        </div>
        <div v-else v-html="folder.Comments__c || '&mdash;'"></div>
      </div>

      

      <div>
        <!--div v-if="editingMode">
          <label><input type="checkbox" v-model="folder.Approved__c" /> Approved</label>
        </div-->
        <TimecardStatusIndicator :approved="folder.Approved__c" /> 
      </div>

      <div class="folder-approve">
        <span @click="toggleFolderApproval">
          {{ folder.Approved__c ? 'Unapprove' : 'Approve' }}
        </span>
      </div>

      <div>
        <UiEditIcon size="1rem" @click="editRow" :active="editingMode" />
      </div>


      
    
  </li>
</template>

<style lang="scss">
.folder-container {

  --star-bg: #ffffff;
  

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;

    &:where(.day,.total) {
      justify-content: center;
      text-align: center;
      font-weight: 700;
    }

    &.day {
      color: var(--gray-300);
      text-align: center;
      font-weight: 700;
      &.active-day {
        color: var(--gray-800);
      }
    }

    &.folder-comments { 
      min-width: 0;
      div {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    &.folder-rating {
      color: var(--star-bg);
    }

    &.folder-approve {
      font-size: 0.8em;
      color: var(--gray-500);
      span:hover {
        cursor: pointer;
        color: var(--approved-color, rgb(38, 215, 38));
      }
    }

    &:last-child div {
      display: none;
      justify-self: end;
    }
  }

  &:hover {
    background: var(--gray-50);
  }
  &.editing {
    background: var(--editing-bg);
    --star-bg: var(--editing-bg);
    .day {
      input {
        height: 2em;
        width: 3em;
        padding: 0;
        text-align: center;
      }
    }
  }

  &.approved {
    background: var(--approved-bg, rgb(38, 215, 38, 0.1));
  }
  
  &:hover:not(.approved),
  &.editing {

    div:last-child div {
      display: block;
    }

  }
}
</style>