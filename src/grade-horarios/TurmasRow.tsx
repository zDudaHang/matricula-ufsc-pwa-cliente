import { TableCell, VFlow, useTheme } from 'bold-ui'
import { TurmaGradeHorarioModel } from './model'
import { TurmaView, TurmaViewProps } from './TurmaView'

interface TurmasRowProps extends Pick<TurmaViewProps, 'showSala'> {
  turmas: TurmaGradeHorarioModel[]
  horarioId: number
  diaSemanaId: number
}

export function TurmasRow(props: TurmasRowProps) {
  const { turmas, diaSemanaId, horarioId, ...turmaViewProps } = props

  const theme = useTheme()

  if (turmas) {
    const hasConflito = turmas.length > 1

    return (
      <TableCell style={{ textAlign: 'center' }}>
        <VFlow vSpacing={0}>
          {turmas.map((turma) => (
            <TurmaView
              key={`turma-${turma.codigoTurma}-${horarioId}-${diaSemanaId}`}
              {...turmaViewProps}
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
