import { Button, HFlow, Icon, Text, Theme } from 'bold-ui'
import { UseInstallResult } from '../../install/useInstall'

interface InstallButtonProps extends UseInstallResult {
  theme: Theme
}

export function InstallButton(props: InstallButtonProps) {
  const { deferredPrompt, reset, theme } = props

  // Baseado em: https://www.amitmerchant.com/adding-custom-install-button-in-progressive-web-apps/
  const handleDownloadClick = async () => {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.debug(`[HeaderBar] userChoice: ${outcome}`)
    if (outcome === 'accepted') reset()
  }

  return (
    <Button onClick={handleDownloadClick} skin='ghost' size='large'>
      <HFlow hSpacing={0.25} alignItems='center'>
        <Icon icon='download' style={{ color: theme.pallete.gray.c100 }} />
        <Text style={{ color: theme.pallete.gray.c100 }}>Instalar</Text>
      </HFlow>
    </Button>
  )
}
