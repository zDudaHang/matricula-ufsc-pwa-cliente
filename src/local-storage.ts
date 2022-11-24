const PREFIX_LOCAL_STORAGE = '@matricula-ufsc-pwa'
const JWT_LOCAL_STORAGE = PREFIX_LOCAL_STORAGE + '/jwt'
const AUTH_USER_LOCAL_STORAGE = PREFIX_LOCAL_STORAGE + '/authUser'
const INSTALLED_USER_LOCAL_STORAGE = PREFIX_LOCAL_STORAGE + '/isInstalled'
const LOCAL_STORAGE_ITEMS = [JWT_LOCAL_STORAGE, AUTH_USER_LOCAL_STORAGE]

export function getAccessToken() {
  return localStorage.getItem(JWT_LOCAL_STORAGE)
}

export function setAccessToken(token: string) {
  localStorage.setItem(JWT_LOCAL_STORAGE, token)
}

export function isInstalled(): boolean {
  const status = localStorage.getItem(INSTALLED_USER_LOCAL_STORAGE)
  return JSON.parse(status) as boolean
}

export function setIsInstalled(status: boolean) {
  return localStorage.setItem(INSTALLED_USER_LOCAL_STORAGE, JSON.stringify(status))
}

export interface AuthUser {
  iaa?: number
  isNotificationAllowed?: boolean
}

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

export function clear() {
  LOCAL_STORAGE_ITEMS.forEach((key) => {
    localStorage.removeItem(key)
  })
}
