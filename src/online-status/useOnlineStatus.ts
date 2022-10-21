import { useContext } from 'react'
import { OnlineStatusContext } from './OnlineStatusProvider'

export const useOnlineStatus = () => {
  const isOnline = useContext(OnlineStatusContext)
  return isOnline
}
