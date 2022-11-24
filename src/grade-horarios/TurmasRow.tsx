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

  if (turmas && turmas.length > 0) {
    const hasConflito = turmas.length > 1

    return (
      <TableCell style={{ textAlign: 'center', border: `1px solid ${theme.pallete.gray.c80}` }}>
        <VFlow vSpacing={0}>
          {turmas.map((turma) => (
            <TurmaView
              key={`turma-${turma.codigoTurma}-${horarioId}-${diaSemanaId}`}
              hasConflito={hasConflito}
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
