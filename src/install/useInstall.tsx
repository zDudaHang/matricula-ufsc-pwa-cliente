import { useEffect, useState } from 'react'

type InstallPromptUserChoice = 'dismissed' | 'accepted'

interface UserChoiceModel {
  outcome: InstallPromptUserChoice
  platform: string
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<any>
  userChoice: Promise<UserChoiceModel>
}

interface UseInstallResult {
  deferredPrompt: BeforeInstallPromptEvent
  reset(): void
}

// https://www.amitmerchant.com/adding-custom-install-button-in-progressive-web-apps/
export function useInstall(): UseInstallResult {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent>()

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      console.debug(`[useInstall] beforeinstallprompt event was fired`)
      return () => {
        window.removeEventListener('beforeinstallprompt', () => {})
      }
    })
  }, [])

  return {
    deferredPrompt,
    reset: () => setDeferredPrompt(null),
  }
}
