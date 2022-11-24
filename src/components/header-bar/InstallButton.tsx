import { Button, HFlow, Icon, Spinner, Text, Theme } from 'bold-ui'
import { useState } from 'react'
import { UseInstallResult } from '../../install/useInstall'

interface InstallButtonProps extends Omit<UseInstallResult, 'isInstalled'> {
  theme: Theme
}

export function InstallButton(props: InstallButtonProps) {
  const { theme, deferredPrompt, reset } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Baseado em: https://www.amitmerchant.com/adding-custom-install-button-in-progressive-web-apps/
  const handleDownloadClick = () => {
    if (deferredPrompt) {
      setIsLoading(true)
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then(({ outcome }) => {
        console.debug(`[HeaderBar] userChoice: ${outcome}`)
        if (outcome === 'accepted') reset()
        setIsLoading(false)
      })
    } else alert('Ops, parece que o seu navegador não tem suporte para instalar :(')
  }

  return (
    <Button onClick={handleDownloadClick} skin='ghost' disabled={isLoading}>
      <HFlow hSpacing={0.25} alignItems='center'>
        <Icon icon='download' style={{ color: theme.pallete.gray.c100 }} />
        {isLoading ? (
          <HFlow alignItems='center'>
            <Text style={{ color: theme.pallete.gray.c100 }}>Instalando ...</Text>
            <Spinner size={1} style={{ color: theme.pallete.gray.c100 }} />
          </HFlow>
        ) : (
          <Text style={{ color: theme.pallete.gray.c100 }}>Instalar</Text>
        )}
      </HFlow>
    </Button>
  )
}
