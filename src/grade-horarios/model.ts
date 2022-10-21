export type HorariosSelecionados = Map<number, Map<number, TurmaGradeHorarioModel[]>>

export interface TurmaGradeHorarioModel {
  codigoTurma: string
  codigoDisciplina: string
  sala: string
  vagasOfertadas: number
  posicao?: number
}

export interface TurmaMatriculada {
  turma: Turma
  posicao: number
}

export interface Turma {
  codigo: string
  vagasOfertadas: number
  professor: Professor
  disciplina: Disciplina
  horarios: TurmaHorarios[]
}

interface Professor {
  nome: string
}

interface Disciplina {
  codigo: string
  nome: string
  cargaHoraria: number
}

interface TurmaHorarios {
  id: {
    diaSemana: DiaSemana
    horario: Horario
    sala: string
  }
}

export interface DiaSemana {
  id: number
  nome: string
}

export interface Horario {
  id: number
  horario: string
  isUltimoHorarioPeriodo: boolean
}
