import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RegistrarAlunoForm } from '../registrar-aluno/RegistrarAlunoForm'
import { LoginForm } from '../login/LoginForm'
import {
  EDITAR_PEDIDO_MATRICULA_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  PEDIDO_MATRICULA_ROUTE,
  REGISTAR_ALUNO_ROUTE,
} from './routes'
import { PrivateRoute } from './PrivateRoute'
import { PedidoMatriculaView } from '../pedido-matricula/PedidoMatriculaView'
import { RegistrarPedidoMatriculaView } from '../registrar-pedido-matricula/RegistrarPedidoMatriculaView'
import { NotFound } from './NotFound'
import { useOnlineStatus } from '../online-status/useOnlineStatus'

export function ApplicationRoutes() {
  const isOnline = useOnlineStatus()

  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<LoginForm />}>
          <Route path=':nomeUsuario' element={<LoginForm />} />
        </Route>
        <Route path={REGISTAR_ALUNO_ROUTE} element={<RegistrarAlunoForm />} />
        <Route
          path={PEDIDO_MATRICULA_ROUTE}
          element={
            <PrivateRoute>
              <PedidoMatriculaView />
            </PrivateRoute>
          }
        />
        {isOnline && (
          <Route
            path={EDITAR_PEDIDO_MATRICULA_ROUTE}
            element={
              <PrivateRoute>
                <RegistrarPedidoMatriculaView />
              </PrivateRoute>
            }
          />
        )}
        <Route path={NOT_FOUND_ROUTE} element={<NotFound />} />
        <Route path='*' element={<Navigate to={NOT_FOUND_ROUTE} />} />
      </Routes>
    </BrowserRouter>
  )
}
