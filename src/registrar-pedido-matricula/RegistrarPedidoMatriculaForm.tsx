import { Button, Cell, Grid, Heading, HFlow, VFlow } from 'bold-ui'
import { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import { useMemo } from 'react'
import { FormRenderProps } from 'react-final-form'
import { ErrorField } from '../components/fields/ErrorField'
import { fetchWithAuthorization } from '../fetch'
import { calculator } from './calculator'
import { GradeHorarios, GradeHorariosProps } from '../grade-horarios/GradeHorarios'
import { SelectTurmaField, SelectTurmaFieldModel } from './components/SelectTurmaField'
import { HORARIOS_FIELD_NAME, TURMAS_FIELD_NAME } from './model'
import { HorariosSelecionados, TurmaMatriculada } from '../grade-horarios/model'
import { Form } from '../components/Form'
import { PEDIDO_MATRICULA_ROUTE } from '../routes/routes'
import { useNavigate } from 'react-router-dom'
import { VoltarButton } from '../components/VoltarButton'

export interface RegistrarPedidoMatriculaFormModel {
  turmas: SelectTurmaFieldModel[]
  horarios: HorariosSelecionados
}

interface RegistrarPedidoMatriculaFormProps extends GradeHorariosProps {
  turmasMatriculadas: TurmaMatriculada[]
}

export function RegistrarPedidoMatriculaForm(props: RegistrarPedidoMatriculaFormProps) {
  const { turmasMatriculadas, horariosSelecionados, ...gradeHorariosProps } = props

  const navigate = useNavigate()

  const handleSubmit = async (values: RegistrarPedidoMatriculaFormModel) =>
    fetchWithAuthorization('registrarPedidoMatricula', {
      method: 'POST',
      body: JSON.stringify({ turmas: values.turmas.map((turma) => turma.codigo) }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

  const handleSubmitSuccess = () => navigate(PEDIDO_MATRICULA_ROUTE)

  const renderForm = (formProps: FormRenderProps<RegistrarPedidoMatriculaFormModel>) => {
    const {
      form: { getFieldState },
      handleSubmit,
    } = formProps

    const horariosSelecionados = getFieldState(HORARIOS_FIELD_NAME)?.value

    return (
      <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <Cell size={12}>
          <VoltarButton path={PEDIDO_MATRICULA_ROUTE} />
          <Heading level={1}>Editando pedido de matrícula</Heading>
          <ErrorField name={HORARIOS_FIELD_NAME} />
        </Cell>
        <Cell size={12}>
          <SelectTurmaField name={TURMAS_FIELD_NAME} />
        </Cell>
        <Cell size={12}>
          <HFlow justifyContent='flex-end'>
            <Button type='submit' kind='primary' onClick={handleSubmit} size='large'>
              Salvar
            </Button>
          </HFlow>
        </Cell>
        <Cell size={12}>
          <VFlow>
            <GradeHorarios horariosSelecionados={horariosSelecionados} {...gradeHorariosProps} />
          </VFlow>
        </Cell>
      </Grid>
    )
  }

  const decorators = useMemo(
    () => [
      createDecorator(calculator()) as Decorator<
        RegistrarPedidoMatriculaFormModel,
        Partial<RegistrarPedidoMatriculaFormModel>
      >,
    ],
    []
  )

  const initialValues: RegistrarPedidoMatriculaFormModel = useMemo(
    () => ({
      turmas: turmasMatriculadas.map((turmaMatriculada) => turmaMatriculada.turma),
      horarios: horariosSelecionados,
    }),
    [horariosSelecionados, turmasMatriculadas]
  )

  return (
    <Form<RegistrarPedidoMatriculaFormModel>
      render={renderForm}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      decorators={decorators}
      onSubmitSucceeded={handleSubmitSuccess}
    />
  )
}
