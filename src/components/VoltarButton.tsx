import { HFlow, Icon } from 'bold-ui'
import { ButtonLink, ButtonLinkProps } from './ButtonLink'

interface VoltarButtonProps extends ButtonLinkProps {}

export function VoltarButton(props: VoltarButtonProps) {
  return (
    <ButtonLink {...props} kind='normal' skin='ghost' size='large'>
      <HFlow hSpacing={0.5}>
        <Icon icon='arrowLeft' />
        Voltar
      </HFlow>
    </ButtonLink>
  )
}
