import { getToken } from 'firebase/messaging'
import { fetchWithAuthorization } from '../fetch'
import { messaging } from './firebase'

export function requestPermission(updateStates: (status: boolean, loading: boolean) => void) {
  if (!window.Notification) {
    alert('O navegador não suporta notificações :(')
    updateStates(false, false)
  } else {
    const permission = Notification.permission
    if (permission === 'default') {
      console.debug('[subscribe] Permissão default')
      Notification.requestPermission().then((status) => {
        if (status === 'denied') {
          alert(
            'Você revogou a permissão para notificações. Por favor, habilite as notificações pelo navegador ou dispositivo.'
          )
          updateStates(false, false)
        } else if (status === 'granted') {
          console.debug('[subscribe] Permissão granted')
          subscribeUser(updateStates)
        }
      })
    } else if (permission === 'denied') {
      alert(
        'Você revogou a permissão para notificações. Por favor, habilite as notificações pelo navegador ou dispositivo.'
      )
      updateStates(false, false)
    } else {
      console.debug('[subscribe] Permissão já granted')
      subscribeUser(updateStates)
    }
  }
}

function subscribeUser(updateStates: (status: boolean, loading: boolean) => void) {
  console.debug('[subscribe] subscribeUser')
  navigator.serviceWorker.ready.then(() => {
    getToken(messaging, {
      vapidKey: process.env.REACT_APP_PUBLIC_VAPID_KEY,
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
            updateStates(true, false)
          }
        })
        .catch(console.error)
    })
  })
}

export function unsubscribeUser(updateStates: (status: boolean, loading: boolean) => void) {
  console.debug(`[subscribe] unsubscribeUser`)
  fetchWithAuthorization('unsubscribe', {
    method: 'PUT',
  })
    .then((response) => {
      if (response.status === 200) {
        console.debug('[subscribe] Setting setIsNotificationAllowed to false')
        updateStates(false, false)
      }
    })
    .catch(console.error)
}
