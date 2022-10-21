import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { registerServiceWorker } from './service-worker'
import './notifications/firebase'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

registerServiceWorker()
