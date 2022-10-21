import { Alert } from 'bold-ui'
import { useField } from 'react-final-form'

interface ErrorFieldProps {
  name: string
}

export function ErrorField(props: ErrorFieldProps) {
  const { name } = props

  const {
    meta: { error, submitError },
  } = useField(name, {
    subscription: { error: true, submitError: true },
  })

  return (
    (error || submitError) && (
      <Alert inline type='danger'>
        {error || submitError}
      </Alert>
    )
  )
}
