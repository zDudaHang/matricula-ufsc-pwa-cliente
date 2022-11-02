import { Button, HFlow, Icon, Spinner, Text, Theme } from 'bold-ui'
import { useState } from 'react'
import { useAuthContext } from '../../login/context/useAuthContext'
import { unsubscribeUser, requestPermission } from '../../notifications/subscribe'

interface NotificationsButtonProps {
  theme: Theme
}

export function NotificationsButton(props: NotificationsButtonProps) {
  const { theme } = props
  const { auth, setIsNotificationAllowedAuthUser } = useAuthContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isNotificationAllowed = auth?.isNotificationAllowed ?? false

  const updateStates = (status: boolean, loading: boolean) => {
    setIsNotificationAllowedAuthUser(status)
    setIsLoading(loading)
  }

  const handleNotificationsClick = () => {
    setIsLoading(true)
    if (isNotificationAllowed) unsubscribeUser(updateStates)
    else requestPermission(updateStates)
  }

  return (
    <Button onClick={handleNotificationsClick} skin='ghost' size='large' disabled={isLoading}>
      <HFlow hSpacing={0.25} alignItems='center'>
        <Icon icon={isNotificationAllowed ? 'bellFilled' : 'bellOutline'} style={{ color: theme.pallete.gray.c100 }} />
        {isLoading ? (
          <HFlow alignItems='center'>
            <Text style={{ color: theme.pallete.gray.c100 }}>
              {' '}
              {isNotificationAllowed ? 'Desativando' : 'Ativando'} ...
            </Text>
            <Spinner size={1} style={{ color: theme.pallete.gray.c100 }} />
          </HFlow>
        ) : (
          <Text style={{ color: theme.pallete.gray.c100 }}>
            {isNotificationAllowed ? 'Desativar' : 'Ativar'} notificações
          </Text>
        )}
      </HFlow>
    </Button>
  )
}
