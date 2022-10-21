import { TextField as BoldTextField, TextFieldProps as BoldTextFieldProps } from 'bold-ui'
import { useField } from 'react-final-form'

interface TextFieldProps extends Pick<BoldTextFieldProps, 'label' | 'placeholder' | 'required'> {
  name: string
}

export function TextField(props: TextFieldProps) {
  const { input, meta } = useField(props.name)

  return (
    <BoldTextField
      {...props}
      error={meta.error || meta.submitError}
      type='text'
      value={input.value}
      onChange={input.onChange}
      clearable={false}
    />
  )
}
