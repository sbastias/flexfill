
const controller = ref(new AbortController())

export const useController = () => {

  const abortAndReset = () => {

    console.log('Resetting controller')

    if (controller.value) {
      console.log('Aborting previous controller')
      controller.value.abort()
    }
    controller.value = new AbortController()
  }

  return {
    controller,
    abortAndReset
  }
}