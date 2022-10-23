import { Text, VFlow } from 'bold-ui'
import { TurmaGradeHorarioModel } from './model'

interface TurmaViewProps {
  turma: TurmaGradeHorarioModel
  hasConflito: boolean
}

export function TurmaView(props: TurmaViewProps) {
  const { hasConflito, turma } = props
  const color = hasConflito ? 'danger' : 'normal'
  return (
    <VFlow vSpacing={0}>
      <Text fontWeight='bold' color={color}>
        {turma.codigoDisciplina} - {turma.codigoTurma}
      </Text>
      <Text color={color}>{turma.sala}</Text>
    </VFlow>
  )
}
