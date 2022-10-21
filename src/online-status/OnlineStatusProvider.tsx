import { createContext, useEffect, useState } from 'react'

export const OnlineStatusContext = createContext(true)

interface OnlineStatusProviderProps {
  children: React.ReactNode
}

// Ref: https://levelup.gitconnected.com/useonlinestatus-a-react-hook-to-know-when-your-app-is-offline-2d06e4e536a
export function OnlineStatusProvider(props: OnlineStatusProviderProps) {
  const [isOnline, setIsOnline] = useState<boolean>(window.navigator.onLine)

  useEffect(() => {
    window.addEventListener('offline', () => {
      console.debug('[OnlineStatusProvider] offline')
      setIsOnline(false)
    })
    window.addEventListener('online', () => {
      console.debug('[OnlineStatusProvider] online')
      setIsOnline(true)
    })

    // cleanup this component
    return () => {
      window.removeEventListener('offline', () => {
        console.debug('[OnlineStatusProvider] offline')
        setIsOnline(false)
      })
      window.removeEventListener('online', () => {
        console.debug('[OnlineStatusProvider] online')
        setIsOnline(true)
      })
    }
  }, [])

  return <OnlineStatusContext.Provider value={isOnline}>{props.children}</OnlineStatusContext.Provider>
}
