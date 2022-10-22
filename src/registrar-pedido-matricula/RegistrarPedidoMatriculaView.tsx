import { useEffect, useMemo, useState } from 'react'
import { fetchWithAuthorization } from '../fetch'
import { TurmaMatriculada } from '../grade-horarios/model'
import { LimitesCargaHoraria } from './model'
import { RegistrarPedidoMatriculaForm } from './RegistrarPedidoMatriculaForm'
import { convertTurmasMatriculadasToHorariosSelecionados } from './util'

export function RegistrarPedidoMatriculaView() {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<TurmaMatriculada[]>([])
  const [limitesCargaHoraria, setLimitesCargaHoraria] = useState<LimitesCargaHoraria>()

  useEffect(() => {
    fetchWithAuthorization('pedidoMatricula').then((response) =>
      response.json().then((turmas: TurmaMatriculada[]) => setTurmasMatriculadas(turmas))
    )
    fetchWithAuthorization('limitesCargaHoraria').then((response) =>
      response.json().then((limites: LimitesCargaHoraria) => setLimitesCargaHoraria(limites))
    )
  }, [])

  const horariosSelecionados = useMemo(
    () => convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas, false),
    [turmasMatriculadas]
  )

  const turmas = useMemo(
    () => turmasMatriculadas.map((turmaMatriculada) => turmaMatriculada.turma),
    [turmasMatriculadas]
  )

  return (
    <RegistrarPedidoMatriculaForm
      turmasMatriculadas={turmas}
      horariosSelecionados={horariosSelecionados}
      limitesCargaHoraria={limitesCargaHoraria}
    />
  )
}
