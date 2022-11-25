import { HFlow, Text } from 'bold-ui'
import { useField } from 'react-final-form'
import { LimitesCargaHoraria } from './model'

const FIELD_NAME = 'cargaHorariaTotal'

interface CargaHorariaTotalInfoProps {
  limitesCargaHoraria: LimitesCargaHoraria
}

export function CargaHorariaTotalInfo(props: CargaHorariaTotalInfoProps) {
  const { limitesCargaHoraria } = props

  const {
    input: { value: cargaHorariaTotal },
  } = useField<number>(FIELD_NAME, { subscription: { value: true } })

  if (cargaHorariaTotal && limitesCargaHoraria) {
    const isDentroLimite =
      cargaHorariaTotal <= limitesCargaHoraria.maxima && cargaHorariaTotal >= limitesCargaHoraria.minima

    return (
      <HFlow hSpacing={0.25} alignItems='center'>
        <Text fontWeight='bold'>Carga horária total:</Text>
        <Text color={isDentroLimite ? 'success' : 'danger'}>{cargaHorariaTotal} H/A</Text>
      </HFlow>
    )
  } else return null
}
