

export const useUiControls = () => {

  const accountOverlayVisible = useState(() => false)

  const toggleAccountOverlay = () => {
    accountOverlayVisible.value = !accountOverlayVisible.value
  }

  return {
    accountOverlayVisible,
    toggleAccountOverlay
  }
}