import { Text, VFlow } from 'bold-ui'
import { TurmaGradeHorarioModel } from './model'

export interface TurmaViewProps {
  turma: TurmaGradeHorarioModel
  hasConflito: boolean
  showSala?: boolean
}

export function TurmaView(props: TurmaViewProps) {
  const { hasConflito, turma, showSala = false } = props

  if (showSala) {
    return (
      <VFlow vSpacing={0}>
        <Text fontWeight='bold'>
          {turma.codigoDisciplina} - {turma.codigoTurma}
        </Text>
        <Text>{turma.sala}</Text>
      </VFlow>
    )
  } else {
    return (
      <Text fontWeight='bold' color={hasConflito ? 'danger' : 'normal'}>
        {turma.codigoDisciplina} - {turma.codigoTurma}
      </Text>
    )
  }
}
