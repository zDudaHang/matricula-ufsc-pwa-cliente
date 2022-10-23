import { Cell, Grid, Heading, HFlow, VFlow } from 'bold-ui'
import { useEffect, useCallback, useState, useMemo } from 'react'
import { ButtonLink } from '../components/ButtonLink'
import { OnlineStatusAlert } from '../components/OnlineStatusAlert'
import { PosicaoInfoAlert } from '../components/PosicaoInfoAlert'
import { fetchWithAuthorization } from '../fetch'
import { GradeHorarios } from '../grade-horarios/GradeHorarios'
import { TurmaMatriculada } from '../grade-horarios/model'
import { OnlyOnlineFeature } from '../components/OnlyOnlineFeature'
import { useOnlineStatus } from '../online-status/useOnlineStatus'
import { convertTurmasMatriculadasToHorariosSelecionados } from '../registrar-pedido-matricula/util'
import { EDITAR_PEDIDO_MATRICULA_ROUTE } from '../routes/routes'
import { EspelhoPedidoMatricula } from './EspelhoPedidoMatricula'

const POLLING_TIME = Number(process.env.REACT_APP_POLLING_TIME_IN_MS)

export function PedidoMatriculaView() {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<TurmaMatriculada[]>([])
  const isOnline = useOnlineStatus()

  const horariosSelecionados = useMemo(
    () => convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas, true),
    [turmasMatriculadas]
  )

  const getPedidoMatricula = useCallback(async () => {
    console.debug('[PedidoMatriculaView - Polling] getPedidoMatricula...')
    const response = await fetchWithAuthorization('pedidoMatricula')
    const pedidoMatricula: TurmaMatriculada[] = await response.json()
    setTurmasMatriculadas(pedidoMatricula)
  }, [setTurmasMatriculadas])

  // Ref: https://thewebdev.info/2021/05/29/how-to-poll-an-api-periodically-with-react/
  useEffect(() => {
    let timer
    if (isOnline) timer = setInterval(getPedidoMatricula, POLLING_TIME)
    return () => clearInterval(timer)
  }, [getPedidoMatricula, isOnline])

  useEffect(() => {
    getPedidoMatricula()

    window.addEventListener('atualizar', () => {
      console.debug('[PedidoMatriculaView] atualizar event arised ')
      getPedidoMatricula()
    })

    return () => {
      window.removeEventListener('atualizar', () => {
        console.debug('[PedidoMatriculaView] removing listener of atualizar event ')
      })
    }
  }, [getPedidoMatricula])

  return (
    <Grid style={{ margin: '1rem' }} gapVertical={1}>
      <Cell size={12}>
        <OnlineStatusAlert />
      </Cell>
      <Cell size={12}>
        <VFlow vSpacing={0}>
          <Heading level={1}>Pedido de matrícula</Heading>
          <PosicaoInfoAlert />
        </VFlow>
      </Cell>
      <Cell size={12}>
        <Heading level={2}>Espelho de matrícula</Heading>
      </Cell>
      <Cell size={12}>
        <EspelhoPedidoMatricula turmasMatriculadas={turmasMatriculadas} />
      </Cell>
      <OnlyOnlineFeature>
        <Cell size={12}>
          <HFlow justifyContent='flex-end'>
            <ButtonLink path={EDITAR_PEDIDO_MATRICULA_ROUTE} kind='primary' size='large' isAbsolutePath>
              Editar pedido de matrícula
            </ButtonLink>
          </HFlow>
        </Cell>
      </OnlyOnlineFeature>
      <Cell size={12}>
        <Heading level={2}>Grade de horários</Heading>
      </Cell>
      <Cell size={12}>
        <GradeHorarios horariosSelecionados={horariosSelecionados} />
      </Cell>
    </Grid>
  )
}
