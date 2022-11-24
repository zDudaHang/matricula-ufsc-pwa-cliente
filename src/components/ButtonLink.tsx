import { Button, ButtonProps } from 'bold-ui'
import { useNavigate } from 'react-router-dom'

export interface ButtonLinkProps extends Omit<ButtonProps, 'onClick'> {
  path: string
  isAbsolutePath?: boolean
  onClick?(): void
}

export function ButtonLink(props: ButtonLinkProps) {
  const { path, isAbsolutePath = false, onClick, ...buttonProps } = props
  const pathToRoute = isAbsolutePath ? `/${path}` : path

  const navigate = useNavigate()
  const handleClick = () => {
    onClick?.()
    navigate(pathToRoute)
  }

  return <Button {...buttonProps} onClick={handleClick}></Button>
}
