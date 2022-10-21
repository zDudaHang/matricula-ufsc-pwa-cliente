import { Button, Cell, Grid, Heading, HFlow, VFlow } from 'bold-ui'
import { FORM_ERROR } from 'final-form'
import { FormRenderProps } from 'react-final-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink'
import { ErrorField } from '../components/fields/ErrorField'
import { PasswordField } from '../components/fields/PasswordField'
import { TextField } from '../components/fields/TextField'
import { Form } from '../components/Form'
import { fetchPostWithJsonBodyAndWithoutAuthorization } from '../fetch'
import { setAccessToken } from '../local-storage'
import { REGISTAR_ALUNO_ROUTE, PEDIDO_MATRICULA_ROUTE } from '../routes/routes'
import { useAuthContext } from './context/useAuthContext'
import { LoginInput, LoginResult } from './model'

type LoginFormModel = LoginInput

interface LoginURLParams {
  nomeUsuario: string
}

export function LoginForm() {
  const navigate = useNavigate()
  const { setAuth } = useAuthContext()

  const { nomeUsuario } = useParams<keyof LoginURLParams>()

  const handleSubmit = (values: LoginFormModel) => fetchPostWithJsonBodyAndWithoutAuthorization('login', values)

  const handleSubmiSuccess = (result: LoginResult) => {
    setAccessToken(result.accessToken)
    setAuth(result.iaa, result.subscriptionToken && Notification.permission === 'granted')
    navigate(PEDIDO_MATRICULA_ROUTE)
  }

  const renderForm = (formProps: FormRenderProps<LoginFormModel>) => {
    return (
      <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <Cell size={12}>
          <VFlow vSpacing={0}>
            <Heading level={1}>Login</Heading>
            <ErrorField name={FORM_ERROR} />
          </VFlow>
        </Cell>
        <Cell size={12}>
          <TextField name='nomeUsuario' label='Usuário' placeholder='Digite o seu usuário' required />
        </Cell>
        <Cell size={12}>
          <PasswordField label='Senha' name='senha' placeholder='Digite sua senha' required />
        </Cell>
        <Cell size={12}>
          <HFlow>
            <ButtonLink size='large' path={REGISTAR_ALUNO_ROUTE} isAbsolutePath>
              Registrar-se
            </ButtonLink>
            <Button type='submit' kind='primary' onClick={formProps.handleSubmit} size='large'>
              Entrar
            </Button>
          </HFlow>
        </Cell>
      </Grid>
    )
  }

  return (
    <Form<LoginFormModel>
      initialValues={{ nomeUsuario }}
      render={renderForm}
      onSubmit={handleSubmit}
      onSubmitSucceeded={handleSubmiSuccess}
    />
  )
}
