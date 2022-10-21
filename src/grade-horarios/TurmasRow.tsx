import { TableCell, VFlow, useTheme } from 'bold-ui'
import { TurmaGradeHorarioModel } from './model'
import { TurmaView } from './TurmaView'

interface TurmasRowProps {
  turmas: TurmaGradeHorarioModel[]
  horarioId: number
  diaSemanaId: number
}

export function TurmasRow(props: TurmasRowProps) {
  const { turmas, diaSemanaId, horarioId } = props

  const theme = useTheme()

  if (turmas) {
    const hasConflito = turmas.length > 1

    return (
      <TableCell style={{ textAlign: 'center' }}>
        <VFlow vSpacing={0.5}>
          {turmas.map((turma) => (
            <TurmaView
              key={`turma-${turma.codigoTurma}-${horarioId}-${diaSemanaId}`}
              color={hasConflito ? 'danger' : 'normal'}
              turma={turma}
            />
          ))}
        </VFlow>
      </TableCell>
    )
  } else {
    return <TableCell style={{ border: `1px solid ${theme.pallete.gray.c80}` }} />
  }
}
