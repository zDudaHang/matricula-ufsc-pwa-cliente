import { HorariosSelecionados } from '../grade-horarios/model'
import { SelectTurmaFieldModel } from './components/SelectTurmaField'

export const HORARIOS_FIELD_NAME = 'horarios'
export const TURMAS_FIELD_NAME = 'turmas'

export interface RegistrarPedidoMatriculaFormModel {
  turmas: SelectTurmaFieldModel[]
  horarios: HorariosSelecionados
  cargaHorariaTotal: number
}

export interface LimitesCargaHoraria {
  minima: number
  maxima: number
}
