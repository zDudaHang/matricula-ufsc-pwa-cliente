import { Alert } from 'bold-ui'
import { LimitesCargaHoraria } from '../model'

export interface LimitesInfoProps {
  limitesCargaHoraria: LimitesCargaHoraria
}

export function LimitesInfo(props: LimitesInfoProps) {
  const { limitesCargaHoraria } = props

  return (
    limitesCargaHoraria && (
      <Alert type='info' inline>
        Um pedido de matrícula é considerado válido quando <strong>não possui conflito de horários</strong> e cuja carga
        horária total está entre <strong>{limitesCargaHoraria.minima} H/A</strong> e{' '}
        <strong>{limitesCargaHoraria.maxima} H/A</strong>
      </Alert>
    )
  )
}
