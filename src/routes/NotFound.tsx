import { Heading, HFlow, Icon, VFlow } from 'bold-ui'
import { ButtonLink } from '../components/ButtonLink'

export function NotFound() {
  return (
    <HFlow justifyContent='center' style={{ marginTop: '3rem' }}>
      <VFlow style={{ alignItems: 'center' }} vSpacing={0.25}>
        <Icon icon='exclamationTriangleFilled' fill='alert' size={5} />
        <Heading level={2}> Essa página não existe </Heading>
        <ButtonLink path='/' kind='primary' skin='ghost' size='large'>
          Voltar para a tela inicial
        </ButtonLink>
      </VFlow>
    </HFlow>
  )
}
