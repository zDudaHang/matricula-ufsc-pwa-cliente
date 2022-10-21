import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { OnlineStatusProvider } from './online-status/OnlineStatusProvider'
import { VFlow } from 'bold-ui'
import { HeaderBar } from './components/HeaderBar'
import { PushNotificationsAlert } from './components/PushNotificationsAlert'
import { AuthProvider } from './login/context/AuthProvider'

function App() {
  return (
    <OnlineStatusProvider>
      <AuthProvider>
        <VFlow vSpacing={0}>
          <PushNotificationsAlert />
          <HeaderBar />
          <ApplicationRoutes />
        </VFlow>
      </AuthProvider>
    </OnlineStatusProvider>
  )
}

export default App
