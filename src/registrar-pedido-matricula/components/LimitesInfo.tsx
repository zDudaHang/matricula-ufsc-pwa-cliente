import { Alert } from 'bold-ui'
import { useField } from 'react-final-form'
import { LimitesCargaHoraria } from '../model'

export interface LimitesInfoProps {
  limitesCargaHoraria: LimitesCargaHoraria
}

const FIELD_NAME = 'cargaHorariaTotal'

export function LimitesInfo(props: LimitesInfoProps) {
  const { limitesCargaHoraria } = props

  const {
    input: { value: cargaHorariaTotal },
  } = useField(FIELD_NAME, { subscription: { value: true } })

  return (
    limitesCargaHoraria && (
      <Alert type='info' inline>
        Um pedido de matrícula é considerado válido quando <strong>não possui conflito de horários</strong> e cuja carga
        horária total está entre <strong>{limitesCargaHoraria.minima} H/A</strong> e{' '}
        <strong>{limitesCargaHoraria.maxima} H/A</strong>. A carga horária total do seu pedido é{' '}
        <strong>{cargaHorariaTotal} H/A</strong>
      </Alert>
    )
  )
}
