import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export const useAuthContext = () => {
  const auth = useContext(AuthContext)
  return auth
}
