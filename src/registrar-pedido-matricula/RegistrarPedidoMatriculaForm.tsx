import { Button, Cell, Grid, Heading, HFlow, VFlow } from 'bold-ui'
import { Decorator } from 'final-form'
import createDecorator from 'final-form-calculate'
import { useMemo } from 'react'
import { FormRenderProps } from 'react-final-form'
import { fetchWithAuthorization } from '../fetch'
import { calculator } from './calculator'
import { GradeHorarios, GradeHorariosProps } from '../grade-horarios/GradeHorarios'
import { SelectTurmaField } from './components/SelectTurmaField'
import { RegistrarPedidoMatriculaFormModel, TURMAS_FIELD_NAME } from './model'
import { Turma } from '../grade-horarios/model'
import { Form } from '../components/Form'
import { PEDIDO_MATRICULA_ROUTE } from '../routes/routes'
import { useNavigate } from 'react-router-dom'
import { VoltarButton } from '../components/VoltarButton'
import { LimitesInfo, LimitesInfoProps } from './components/LimitesInfo'
import { calcularCargaHorariaTotal } from './util'
import { CargaHorariaTotalInfo } from './CargaHorariaTotalInfo'

interface RegistrarPedidoMatriculaFormProps extends GradeHorariosProps, LimitesInfoProps {
  turmasMatriculadas: Turma[]
}

export function RegistrarPedidoMatriculaForm(props: RegistrarPedidoMatriculaFormProps) {
  const { turmasMatriculadas, horariosSelecionados, limitesCargaHoraria } = props

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
    const { handleSubmit } = formProps

    return (
      <Grid justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <Cell size={12}>
          <VoltarButton path={PEDIDO_MATRICULA_ROUTE} />
          <Heading level={1}>Editando pedido de matrícula</Heading>
          <LimitesInfo limitesCargaHoraria={limitesCargaHoraria} />
        </Cell>
        <Cell size={12}>
          <VFlow>
            <CargaHorariaTotalInfo limitesCargaHoraria={limitesCargaHoraria} />
            <SelectTurmaField name={TURMAS_FIELD_NAME} />
          </VFlow>
        </Cell>
        <Cell size={12}>
          <HFlow justifyContent='flex-end'>
            <Button type='submit' kind='primary' onClick={handleSubmit}>
              Salvar
            </Button>
          </HFlow>
        </Cell>
        <Cell size={12}>
          <VFlow>
            <Heading level={2}>Grade de horários</Heading>
            <GradeHorarios horariosSelecionados={horariosSelecionados} />
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
      turmas: turmasMatriculadas,
      horarios: horariosSelecionados,
      cargaHorariaTotal: calcularCargaHorariaTotal(turmasMatriculadas),
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
