import { Heading, HFlow, useTheme } from 'bold-ui'
import { OnlyOnlineFeature } from './OnlyOnlineFeature'
import { OnlyAuthenticatedFeature } from './OnlyAuthenticatedFeature'
import { NotificationsButton } from './header-bar/NotificationsButton'
import { InstallButton } from './header-bar/InstallButton'
import { LogoutButton } from './header-bar/LogoutButton'
import { useInstall } from '../install/useInstall'

export function HeaderBar() {
  const theme = useTheme()
  const { isInstalled, ...rest } = useInstall()

  return (
    <HFlow
      style={{ background: theme.pallete.primary.c40, height: '4rem', padding: '1rem 0 1rem 0' }}
      justifyContent='center'
      alignItems='center'
    >
      <Heading style={{ color: theme.pallete.gray.c100 }} level={3}>
        Matrícula UFSC
      </Heading>
      <OnlyAuthenticatedFeature>
        <OnlyOnlineFeature>
          <NotificationsButton theme={theme} />
          {!isInstalled && <InstallButton theme={theme} {...rest} />}
        </OnlyOnlineFeature>
        <LogoutButton theme={theme} />
      </OnlyAuthenticatedFeature>
    </HFlow>
  )
}
