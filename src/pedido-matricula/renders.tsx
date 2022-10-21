import { HFlow, Icon, Text } from 'bold-ui'
import { TurmaMatriculada } from '../grade-horarios/model'

export const renderDisciplinaTurma = ({ turma }: TurmaMatriculada) => (
  <Text>
    {turma.disciplina.nome} ({turma.disciplina.codigo}) - {turma.codigo}
  </Text>
)

export const renderProfessor = ({ turma }: TurmaMatriculada) => <Text>{turma.professor.nome}</Text>

export const renderStatus = ({ turma, posicao }: TurmaMatriculada) => {
  const isVagaPossivel = posicao <= turma.vagasOfertadas

  return (
    <HFlow hSpacing={0.25} alignItems='center'>
      <Icon
        fill={isVagaPossivel ? 'success' : 'alert'}
        icon={isVagaPossivel ? 'checkCircleFilled' : 'exclamationTriangleFilled'}
      />
      <Text fontWeight='bold' color={isVagaPossivel ? 'success' : 'alert'}>
        {isVagaPossivel ? 'Vaga possível' : 'Fila de espera'}
      </Text>
    </HFlow>
  )
}

export const renderPosicao = ({ turma, posicao }: TurmaMatriculada) => {
  const isVagaPossivel = posicao <= turma.vagasOfertadas
  const rank = isVagaPossivel ? posicao : posicao - turma.vagasOfertadas

  return (
    <Text>
      {rank}º lugar {isVagaPossivel ? `dentre ${turma.vagasOfertadas}` : 'na fila de espera'}
    </Text>
  )
}
