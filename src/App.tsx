import { ApplicationRoutes } from './routes/ApplicationRoutes'
import { OnlineStatusProvider } from './online-status/OnlineStatusProvider'
import { VFlow } from 'bold-ui'
import { PushNotificationsAlert } from './components/PushNotificationsAlert'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { AuthProvider } from './login/context/AuthProvider'

function App() {
  return (
    <OnlineStatusProvider>
      <AuthProvider>
        <VFlow vSpacing={0}>
          <PushNotificationsAlert />
          <ApplicationRoutes />
        </VFlow>
      </AuthProvider>
    </OnlineStatusProvider>
  )
}

serviceWorkerRegistration.register()

export default App
