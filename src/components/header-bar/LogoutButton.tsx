import { HFlow, Icon, Text, Theme } from 'bold-ui'
import { clear } from '../../local-storage'
import { useAuthContext } from '../../login/context/useAuthContext'
import { LOGIN_ROUTE } from '../../routes/routes'
import { ButtonLink } from '../ButtonLink'

interface LogoutButtonProps {
  theme: Theme
}

export function LogoutButton(props: LogoutButtonProps) {
  const { theme } = props

  const { reset } = useAuthContext()

  const handleClick = () => {
    clear()
    reset()
  }

  return (
    <ButtonLink onClick={handleClick} skin='ghost' path={LOGIN_ROUTE}>
      <HFlow hSpacing={0.25} alignItems='center'>
        <Icon icon='signOut' style={{ color: theme.pallete.gray.c100 }} />
        <Text style={{ color: theme.pallete.gray.c100 }}>Sair</Text>
      </HFlow>
    </ButtonLink>
  )
}
