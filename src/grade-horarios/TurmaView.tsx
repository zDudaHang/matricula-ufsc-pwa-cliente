import { VFlow, Text, TextProps } from 'bold-ui'
import { TurmaGradeHorarioModel } from './model'

interface TurmaViewProps extends Pick<TextProps, 'color'> {
  turma: TurmaGradeHorarioModel
}

export function TurmaView(props: TurmaViewProps) {
  const { color, turma } = props

  return (
    <VFlow vSpacing={0}>
      <Text fontWeight='bold' color={color}>
        {turma.codigoDisciplina} - {turma.codigoTurma}
      </Text>
      <Text color={color}>{turma.sala}</Text>
    </VFlow>
  )
}
