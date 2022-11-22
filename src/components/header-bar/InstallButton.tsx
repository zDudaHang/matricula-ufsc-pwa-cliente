import { Button, HFlow, Icon, Text, Theme } from 'bold-ui'
import { useInstall } from '../../install/useInstall'

interface InstallButtonProps {
  theme: Theme
}

export function InstallButton(props: InstallButtonProps) {
  const { theme } = props

  const { deferredPrompt, reset } = useInstall()

  // Baseado em: https://www.amitmerchant.com/adding-custom-install-button-in-progressive-web-apps/
  const handleDownloadClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.debug(`[HeaderBar] userChoice: ${outcome}`)
      if (outcome === 'accepted') reset()
    } else alert('Ops, parece que o seu navegador não tem suporte para instalar :(')
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
