import { getAccessToken } from './local-storage'

const SERVER_URL = 'http://localhost:8080'

export const HTTP_STATUS_OK = 200
export const HTTP_STATUS_VALIDATION_EXCEPTION = 400

export type ErrorObject<DataType> = {
  [key in keyof DataType]?: ErrorObject<DataType[key]> | string
}

export interface ServerValidationError<DataType> {
  errors: ErrorObject<DataType>
}

export function fetchWithAuthorization(fetchUrl: string, options?: RequestInit): Promise<Response> {
  const accessToken = getAccessToken()
  return fetch(`${SERVER_URL}/${fetchUrl}`, {
    ...options,
    headers: { Authorization: `Bearer ${accessToken}`, ...options?.headers },
  })
}

// TODO : Adicionar mais uma função com post + authorization
export function fetchPostWithJsonBodyAndWithoutAuthorization(fetchUrl: string, body: any): Promise<Response> {
  return fetch(`${SERVER_URL}/${fetchUrl}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
