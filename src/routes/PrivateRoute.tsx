import { Navigate, RouteProps } from 'react-router-dom'
import { getAccessToken } from '../local-storage'
import { LOGIN_ROUTE } from './routes'

type PrivateRouteProps = Pick<RouteProps, 'children'>

export function PrivateRoute({ children }: PrivateRouteProps) {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return <Navigate to={`/${LOGIN_ROUTE}`} />
  }

  return <>{children}</>
}
