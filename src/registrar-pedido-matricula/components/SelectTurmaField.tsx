import { HFlow, isEqual, Select, SelectDownshiftRenderProps, Text, VFlow } from 'bold-ui'
import { useEffect, useState } from 'react'
import { useField } from 'react-final-form'
import { fetchWithAuthorization } from '../../fetch'
import { Turma } from '../../grade-horarios/model'

export type SelectTurmaFieldModel = Turma

const renderItem = (turma: SelectTurmaFieldModel) => {
  const {
    disciplina,
    professor: { nome: nomeProfessor },
    codigo,
  } = turma

  return (
    <VFlow vSpacing={0} style={{ marginLeft: '1rem' }}>
      <Text fontWeight='bold'>
        {disciplina.nome} ({disciplina.codigo}) - Turma {codigo}
      </Text>
      <HFlow>Professor: {nomeProfessor}</HFlow>
      <HFlow>Carga horária: {disciplina.cargaHoraria} horas aula (H/A)</HFlow>
    </VFlow>
  )
}

const handleFilterChange = (filter: string, downshift: SelectDownshiftRenderProps<SelectTurmaFieldModel>) => {
  const items = downshift.items
  if (filter) {
    const filteredItems = items.filter(
      (turma) =>
        turma.codigo.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        turma.professor.nome.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        turma.disciplina.nome.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        turma.disciplina.codigo.toLowerCase().includes(filter.toLocaleLowerCase())
    )
    downshift.setVisibleItems(filteredItems)
  } else {
    downshift.setVisibleItems(items)
  }
}

const itemToString = (turma: SelectTurmaFieldModel) => `${turma?.disciplina.codigo} - ${turma?.codigo}`

const itemIsEqual = (turmaA: SelectTurmaFieldModel, turmaB: SelectTurmaFieldModel) =>
  isEqual(turmaA?.codigo, turmaB?.codigo)

interface SelectTurmaFieldProps {
  name: string
}

export function SelectTurmaField(props: SelectTurmaFieldProps) {
  const { input, meta } = useField(props.name)

  const [turmas, setTurmas] = useState<Turma[]>([])

  useEffect(() => {
    fetchWithAuthorization('turmas').then((response) => response.json().then((turmas: Turma[]) => setTurmas(turmas)))
  }, [])

  return (
    <Select<SelectTurmaFieldModel>
      label='Turmas'
      placeholder='Selecione as turmas que queira se matricular'
      value={input.value}
      error={meta.error || meta.submitError}
      onChange={input.onChange}
      items={turmas}
      renderItem={renderItem}
      itemToString={itemToString}
      itemIsEqual={itemIsEqual}
      multiple
      required
      onFilterChange={handleFilterChange}
    />
  )
}
