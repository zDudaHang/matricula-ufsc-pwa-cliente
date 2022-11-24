import { createContext, useState } from 'react'
import { AuthUser, getAuthUser, setAuthUser } from '../../local-storage'

export const AuthContext = createContext<AuthContextModel>(null)

export interface AuthContextModel {
  auth: AuthUser
  setAuth(iaa: number, isNotificationAllowed: boolean): void
  setIsNotificationAllowedAuthUser(isNotificationAllowed: boolean): void
  reset(): void
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthUser>(getAuthUser())

  const handleUpdate = (iaa: number, isNotificationAllowed: boolean) => {
    setAuthUser(iaa, isNotificationAllowed)
    setAuth({ iaa, isNotificationAllowed })
  }

  const handleUpdateIsNotificationAllowed = (isNotificationAllowed: boolean) =>
    handleUpdate(auth?.iaa, isNotificationAllowed)

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth: handleUpdate,
        setIsNotificationAllowedAuthUser: handleUpdateIsNotificationAllowed,
        reset: () => setAuth(null),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
