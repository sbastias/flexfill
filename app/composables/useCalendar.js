
const transitionName = ref('slide-next')

const activeStartDay = ref(new Date(new Date().toISOString().substring(0, 10)))
activeStartDay.value.setUTCDate(1)

const activeEndDay = computed(() => {
  const d = new Date(activeStartDay.value)
  d.setUTCMonth(d.getUTCMonth() + 1)
  d.setUTCDate(0)
  return d
})


export const useCalendar = () => {
  


  const activeMonthName = computed(() => {
    return activeStartDay.value.toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'utc' })
  })

  const goToPrevMonth = () => {
    transitionName.value = 'slide-prev' // Slides current month right, new month enters from left
    const d = new Date(activeStartDay.value)
    d.setUTCMonth(d.getUTCMonth() - 1)
    activeStartDay.value = d
  }

  const goToNextMonth = () => {
    transitionName.value = 'slide-next' // Slides current month left, new month enters from right
    const d = new Date(activeStartDay.value)
    d.setUTCMonth(d.getUTCMonth() + 1)
    activeStartDay.value = d
  }

  return {
    activeStartDay,
    activeEndDay,
    activeMonthName,
    goToPrevMonth,
    goToNextMonth,
    transitionName
  }
}