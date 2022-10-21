import { Alert } from 'bold-ui'
import { useOnlineStatus } from '../online-status/useOnlineStatus'

export function OnlineStatusAlert() {
  const isOnline = useOnlineStatus()

  return (
    !isOnline && (
      <Alert type='warning' inline>
        Você está offline, algumas funcionalidades foram desativadas e informações podem estar desatualizadas
      </Alert>
    )
  )
}
