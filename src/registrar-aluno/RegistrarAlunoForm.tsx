import { Grid, Cell, Heading, Button } from 'bold-ui'
import { FormRenderProps } from 'react-final-form'
import { useNavigate } from 'react-router-dom'
import { PasswordField } from '../components/fields/PasswordField'
import { TextField } from '../components/fields/TextField'
import { Form } from '../components/Form'
import { VoltarButton } from '../components/VoltarButton'
import { fetchPostWithJsonBodyAndWithoutAuthorization } from '../fetch'
import { LOGIN_ROUTE } from '../routes/routes'
import { RegistrarAlunoInput, RegistrarAlunoResult } from './model'

type RegistrarAlunoFormModel = RegistrarAlunoInput

export function RegistrarAlunoForm() {
  const navigate = useNavigate()

  const handleSubmit = (values: RegistrarAlunoFormModel) =>
    fetchPostWithJsonBodyAndWithoutAuthorization('registrarAluno', values)

  const handleSubmiSuccess = (result: RegistrarAlunoResult) => navigate(`/${LOGIN_ROUTE}/${result.nomeUsuario}`)

  const renderForm = (formProps: FormRenderProps<RegistrarAlunoFormModel>) => {
    return (
      <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <Cell size={12}>
          <VoltarButton path={LOGIN_ROUTE} isAbsolutePath />
          <Heading level={1}>Registrando um aluno</Heading>
        </Cell>
        <Cell size={12}>
          <TextField name='nomeUsuario' label='Usuário' placeholder='Digite o seu usuário' required />
        </Cell>
        <Cell size={12}>
          <PasswordField label='Senha' name='senha' placeholder='Digite sua senha' required />
        </Cell>
        <Cell size={12} alignSelf='flex-end'>
          <Button type='submit' kind='primary' size='large' onClick={formProps.handleSubmit}>
            Registrar
          </Button>
        </Cell>
      </Grid>
    )
  }

  return (
    <Form<RegistrarAlunoFormModel> render={renderForm} onSubmit={handleSubmit} onSubmitSucceeded={handleSubmiSuccess} />
  )
}
