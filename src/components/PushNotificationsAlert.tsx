import { Alert, AlertType } from 'bold-ui'
import { onMessage } from 'firebase/messaging'
import { useState } from 'react'
import { messaging } from '../notifications/firebase'

interface NotificationData {
  message?: string
  type?: AlertType
}

interface AlertMessage extends Pick<NotificationData, 'type'> {
  title?: string
  body?: string
}

export function PushNotificationsAlert() {
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [message, setMessage] = useState<AlertMessage>({})

  onMessage(messaging, (payload) => {
    console.debug('[PushNotificationsAlert] Received foreground message ', payload)
    const title = payload.notification.title
    const data: NotificationData = payload.data

    if (data) {
      setMessage({ title, body: data.message, type: data.type })
      setShowAlert(true)

      const event = new Event('atualizar')
      window.dispatchEvent(event)
    }
  })

  return (
    showAlert &&
    message && (
      <Alert type={message.type} onCloseClick={() => setShowAlert(false)}>
        {message.title} {message.body && `: ${message.body}`}
      </Alert>
    )
  )
}
