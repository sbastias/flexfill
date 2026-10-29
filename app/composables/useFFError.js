
export const useFFError = () => {
  
  const Toaster = useToaster()

  const unauthorizedError = (message) => {
    Toaster.activate({message: (message || 'Unauthorized access') + ' - Please try logging in again.', status: 'error'})
  }


  return {
    unauthorizedError
  }
}