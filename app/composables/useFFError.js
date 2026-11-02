
export const useFFError = () => {
  
  const Toaster = useToaster()

  const unauthorizedError = (message) => {
    Toaster.activate({message: (message || 'Unauthorized access') + ' - Please try logging in again.', status: 'error'})
  }

  const notFoundError = (message) => {
    Toaster.activate({message: (message || 'The requested data could not be found.'), status: 'error'})
  }


  return {
    unauthorizedError,
    notFoundError
  }
}