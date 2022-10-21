import { useAuthContext } from '../login/context/useAuthContext'

interface OnlyAuthenticatedFeatureProps {
  children: React.ReactNode
}

export function OnlyAuthenticatedFeature(props: OnlyAuthenticatedFeatureProps) {
  const { auth } = useAuthContext()
  return auth ? <>{props.children}</> : null
}
