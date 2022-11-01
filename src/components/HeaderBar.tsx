import { Heading, HFlow, useTheme } from 'bold-ui'
import { useInstall } from '../install/useInstall'
import { OnlyOnlineFeature } from './OnlyOnlineFeature'
import { OnlyAuthenticatedFeature } from './OnlyAuthenticatedFeature'
import { NotificationsButton } from './header-bar/NotificationsButton'
import { InstallButton } from './header-bar/InstallButton'

export function HeaderBar() {
  const theme = useTheme()
  const { deferredPrompt, reset } = useInstall()

  return (
    <HFlow
      style={{ background: theme.pallete.primary.c40, height: '4rem', padding: '1rem 0 1rem 0' }}
      justifyContent='center'
      alignItems='center'
    >
      <Heading level={1} style={{ color: theme.pallete.gray.c100 }}>
        Matrícula UFSC
      </Heading>{' '}
      <OnlyAuthenticatedFeature>
        <OnlyOnlineFeature>
          <NotificationsButton theme={theme} />
          {deferredPrompt && <InstallButton deferredPrompt={deferredPrompt} reset={reset} theme={theme} />}
        </OnlyOnlineFeature>
      </OnlyAuthenticatedFeature>
    </HFlow>
  )
}
