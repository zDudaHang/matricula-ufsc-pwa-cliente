const PREFIX_LOCAL_STORAGE = '@matricula-ufsc-pwa'
const JWT_LOCAL_STORAGE = PREFIX_LOCAL_STORAGE + '/jwt'

export function getAccessToken() {
  return localStorage.getItem(JWT_LOCAL_STORAGE)
}

export function setAccessToken(token: string) {
  localStorage.setItem(JWT_LOCAL_STORAGE, token)
}

export interface AuthUser {
  iaa?: number
  isNotificationAllowed?: boolean
}

const AUTH_USER_LOCAL_STORAGE = PREFIX_LOCAL_STORAGE + '/authUser'

export function getAuthUser(): AuthUser {
  const auth = localStorage.getItem(AUTH_USER_LOCAL_STORAGE)
  return JSON.parse(auth) as AuthUser
}

export function setAuthUser(iaa: number, isNotificationAllowed?: boolean) {
  const auth: AuthUser = { iaa, isNotificationAllowed: isNotificationAllowed ?? false }
  localStorage.setItem(AUTH_USER_LOCAL_STORAGE, JSON.stringify(auth))
}

export function setIsNotificationAllowedAuthUser(isNotificationAllowed: boolean) {
  const auth = getAuthUser()
  setAuthUser(auth?.iaa, isNotificationAllowed)
}
