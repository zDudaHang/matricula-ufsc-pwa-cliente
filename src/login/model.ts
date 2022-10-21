export interface LoginInput {
  nomeUsuario: string
  senha: string
}

export interface LoginResult {
  subscriptionToken: string
  accessToken: string
  iaa: number
}
