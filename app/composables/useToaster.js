

export const useToaster = () => {

  const visible = useState(() => false)
  const message = useState(() => '')
  const status = useState(() => false)

  const activate = toasterObj => {
    message.value = toasterObj.message
    status.value = toasterObj.status
    nextTick(() => visible.value = true)
    setTimeout(deactivate, 4000)
  }

  const deactivate = () => {
    visible.value = false
    setTimeout(() => {
      message.value = ''
      status.value = false
    }, 500)
  }

  return {
    visible,
    message,
    status,
    activate,
    deactivate
  }
}