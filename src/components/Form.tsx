import { FormApi, FORM_ERROR } from 'final-form'
import { FormProps as FinalFormProps, Form as FinalForm } from 'react-final-form'
import { HTTP_STATUS_OK, HTTP_STATUS_VALIDATION_EXCEPTION, ServerValidationError } from '../fetch'

interface FormProps<T> extends FinalFormProps<T> {
  onSubmit(values: T, formApi: FormApi<T>): Promise<any>
  onSubmitSucceeded?(responseBody: any): void
}

export function Form<T>(props: FormProps<T>) {
  const { onSubmit, onSubmitSucceeded, ...rest } = props

  const handleSubmitWrapper = async (values: T, formApi: FormApi<T>) => {
    const response = await onSubmit(values, formApi)
    const responseJSON = await response.json()
    if (response.status === HTTP_STATUS_VALIDATION_EXCEPTION) {
      console.debug('[Form] Validation exception')
      const errors = responseJSON as ServerValidationError<T>
      const validationError = errors.errors
      if (typeof validationError === 'string') return { [FORM_ERROR]: validationError }
      else return { ...validationError }
    } else if (response.status === HTTP_STATUS_OK) {
      console.debug('[Form] Calling onSubmitSucceeded')
      onSubmitSucceeded(responseJSON)
    }
  }

  return <FinalForm<T> {...rest} onSubmit={handleSubmitWrapper} />
}
