import { Alert } from 'bold-ui'
import { useAuthContext } from '../login/context/useAuthContext'

export function PosicaoInfoAlert() {
  const { auth } = useAuthContext()
  const hasInfo = auth && (auth.iaa !== null || auth.iaa !== undefined)

  return (
    hasInfo && (
      <Alert type='info' inline>
        A posição em uma turma é determinada pelo Índice de Aproveitamento Semestral Acumulado (IAA) e o seu é{' '}
        <strong>{auth.iaa}</strong>. Esse valor foi gerado <strong> aleatoriamente </strong> pelo servidor
      </Alert>
    )
  )
}
