import { DataTable } from 'bold-ui'
import { TurmaMatriculada } from '../grade-horarios/model'
import { renderDisciplinaTurma, renderPosicao, renderProfessor, renderStatus } from './renders'

interface StatusPedidoMatriculaProps {
  turmasMatriculadas: TurmaMatriculada[]
}

export function StatusPedidoMatricula(props: StatusPedidoMatriculaProps) {
  const { turmasMatriculadas } = props

  return (
    <DataTable<TurmaMatriculada>
      columns={[
        {
          header: 'Disciplina - Turma',
          name: 'nome',
          render: renderDisciplinaTurma,
          sortable: false,
        },
        {
          header: 'Professor',
          name: 'professor',
          render: renderProfessor,
          sortable: false,
        },
        {
          header: 'Status da vaga',
          name: 'status',
          render: renderStatus,
          sortable: false,
        },
        {
          header: 'Sua posição',
          name: 'posicao',
          render: renderPosicao,
          sortable: false,
        },
      ]}
      rows={turmasMatriculadas}
    />
  )
}
