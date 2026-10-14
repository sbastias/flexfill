
export const useJobOrder = () => {
  // Define your composable logic here
  const currentOrder = ref(null)
  const doSomething = (payload) => {
    alert('Doing something with payload: ' + JSON.stringify(payload))
  }

  return {

    currentOrder,
    doSomething,

  }
}