import { TextField, TextFieldProps } from 'bold-ui'
import { useField } from 'react-final-form'

interface PasswordFieldProps extends Pick<TextFieldProps, 'label' | 'placeholder' | 'required'> {
  name: string
}

// TODO: Deixar só como 'password' para esconder a senha
export function PasswordField(props: PasswordFieldProps) {
  const { input, meta } = useField(props.name)

  return (
    <TextField
      {...props}
      error={meta.error || meta.submitError}
      type='password'
      value={input.value}
      onChange={input.onChange}
      clearable={false}
    />
  )
}
