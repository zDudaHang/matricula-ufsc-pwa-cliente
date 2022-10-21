import { useEffect, useMemo, useState } from 'react'
import { fetchWithAuthorization } from '../fetch'
import { TurmaMatriculada } from '../grade-horarios/model'
import { RegistrarPedidoMatriculaForm } from './RegistrarPedidoMatriculaForm'
import { convertTurmasMatriculadasToHorariosSelecionados } from './util'

export function RegistrarPedidoMatriculaView() {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<TurmaMatriculada[]>([])

  useEffect(() => {
    fetchWithAuthorization('pedidoMatricula').then((response) =>
      response.json().then((turmas: TurmaMatriculada[]) => setTurmasMatriculadas(turmas))
    )
  }, [])

  const horariosSelecionados = useMemo(
    () => convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas, false),
    [turmasMatriculadas]
  )

  return (
    <RegistrarPedidoMatriculaForm turmasMatriculadas={turmasMatriculadas} horariosSelecionados={horariosSelecionados} />
  )
}
