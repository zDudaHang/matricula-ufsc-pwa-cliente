import { ExternalStyles, Table, TableBody, TableHead, TableHeader, TableRow, useTheme } from 'bold-ui'
import { useState, useEffect } from 'react'
import { fetchWithAuthorization } from '../fetch'
import { HorarioRow } from './HorarioRow'
import { DiaSemana, Horario, HorariosSelecionados } from './model'

export interface GradeHorariosProps {
  horariosSelecionados: HorariosSelecionados
}

// TODO: Deixar esse componente visivel sem internet -> Cenarios: o usuario jah ter logado e nao ter logado
export function GradeHorarios(props: GradeHorariosProps) {
  const { horariosSelecionados } = props

  const theme = useTheme()

  const style: ExternalStyles = {
    background: theme.pallete.primary.c40,
    color: theme.pallete.gray.c100,
  }

  const [horarios, setHorarios] = useState<Horario[]>([])
  const [diasSemana, setDiasSemana] = useState<DiaSemana[]>([])

  useEffect(() => {
    fetchWithAuthorization('horarios').then((response) =>
      response.json().then((horarios: Horario[]) => setHorarios(horarios))
    )
    fetchWithAuthorization('diasSemana').then((response) =>
      response.json().then((diasSemana: DiaSemana[]) => setDiasSemana(diasSemana))
    )
  }, [])

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader key='vazia' style={style} />
          {diasSemana.map((diasSemana) => (
            <TableHeader key={`th-${diasSemana.id}`} style={{ textAlign: 'center', ...style }}>
              {diasSemana.nome}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {horarios.map((horario) => (
          <HorarioRow
            key={`tr-horario-${horario.id}`}
            horario={horario}
            diasSemana={diasSemana}
            horariosSelecionados={horariosSelecionados}
          />
        ))}
      </TableBody>
    </Table>
  )
}
