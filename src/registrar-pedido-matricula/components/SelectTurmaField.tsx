import { HFlow, isEqual, Select, Text, VFlow } from 'bold-ui'
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
    vagasOfertadas,
  } = turma

  return (
    <VFlow vSpacing={0} style={{ marginLeft: '1rem' }}>
      <Text fontWeight='bold'>
        {disciplina.nome} ({disciplina.codigo}) - Turma {codigo}
      </Text>
      <HFlow>Professor: {nomeProfessor}</HFlow>
      <HFlow>Vagas ofertadas: {vagasOfertadas}</HFlow>
      <HFlow>Carga horária (H/A): {disciplina.cargaHoraria}</HFlow>
    </VFlow>
  )
}

const itemToString = (turma: SelectTurmaFieldModel) => turma?.codigo

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
    />
  )
}
