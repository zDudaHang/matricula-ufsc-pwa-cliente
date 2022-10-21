import { getToken } from 'firebase/messaging'
import { fetchWithAuthorization } from '../fetch'
import { messaging, PUBLIC_VAPID_KEY } from './firebase'

export function requestPermission(setIsNotificationAllowed: (status: boolean) => void) {
  if (!window.Notification) {
    alert('The browser does not support notifications')
  } else {
    const permission = Notification.permission
    if (permission === 'default') {
      console.debug('[subscribe] Permissao default')
      Notification.requestPermission().then((status) => {
        if (status === 'denied') {
          alert(
            'You have denied permission for notifications. Please go to your browser or mobile settings and enable notifications'
          )
        } else if (status === 'granted') {
          console.debug('[subscribe] Permissao garantida')
          subscribeUser(setIsNotificationAllowed)
        }
      })
    } else if (permission === 'denied') {
      alert(
        'You have denied permission for notifications. Please go to your browser or mobile settings and enable notifications'
      )
    } else {
      console.debug('[subscribe] Permissao garantida')
      subscribeUser(setIsNotificationAllowed)
    }
  }
}

function subscribeUser(setIsNotificationAllowed: (status: boolean) => void) {
  console.debug('[subscribe] subscribeUser')
  navigator.serviceWorker.ready.then(() => {
    getToken(messaging, {
      vapidKey: PUBLIC_VAPID_KEY,
    }).then((token) => {
      console.debug(`[subscribe] Enviando token do firebase para o servidor...`)
      fetchWithAuthorization('subscribe', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status === 200) {
            console.debug('[subscribe] Setting setIsNotificationAllowed to true')
            setIsNotificationAllowed(true)
          }
        })
        .catch(console.error)
    })
  })
}

export function unsubscribeUser(setIsNotificationAllowed: (status: boolean) => void) {
  console.debug(`[subscribe] unsubscribeUser`)
  fetchWithAuthorization('unsubscribe', {
    method: 'PUT',
  })
    .then((response) => {
      if (response.status === 200) {
        console.debug('[subscribe] Setting setIsNotificationAllowed to false')
        setIsNotificationAllowed(false)
      }
    })
    .catch(console.error)
}
