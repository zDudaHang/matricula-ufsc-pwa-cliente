import { Button, ButtonProps } from 'bold-ui'
import { useNavigate } from 'react-router-dom'

export interface ButtonLinkProps extends ButtonProps {
  path: string
  isAbsolutePath?: boolean
}

export function ButtonLink(props: ButtonLinkProps) {
  const { path, isAbsolutePath = false, ...buttonProps } = props
  const pathToRoute = isAbsolutePath ? `/${path}` : path

  const navigate = useNavigate()
  const handleClick = () => navigate(pathToRoute)

  return <Button {...buttonProps} onClick={handleClick}></Button>
}
