import { useEffect, useState } from 'react'
import { isInstalled, setIsInstalled } from '../local-storage'

type InstallPromptUserChoice = 'dismissed' | 'accepted'

interface UserChoiceModel {
  outcome: InstallPromptUserChoice
  platform: string
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<any>
  userChoice: Promise<UserChoiceModel>
}

export interface UseInstallResult {
  deferredPrompt: BeforeInstallPromptEvent
  isInstalled: boolean
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
    })

    window.addEventListener('appinstalled', (evt) => {
      setIsInstalled(true)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {})
      window.removeEventListener('appinstalled', () => {})
    }
  }, [])

  return {
    deferredPrompt,
    reset: () => setDeferredPrompt(null),
    isInstalled: isInstalled(),
  }
}
