import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

export const PUBLIC_VAPID_KEY =
  'BKeDin_xnLD8OmBUskj2lOxYfTDVTDvVOvQCQg3nwJvlaRKzadOOq0LcvG1hW8hPDxLSqdluei-Fl17AGN-cRGk'

// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: 'AIzaSyAP_Nr9rkSJ0g7hvQKbjQI9UH_Jy6kK_u0',
  authDomain: 'matricula-ufsc.firebaseapp.com',
  projectId: 'matricula-ufsc',
  storageBucket: 'matricula-ufsc.appspot.com',
  messagingSenderId: '544318734893',
  appId: '1:544318734893:web:5f826baad5a07047f32ea4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
// https://firebase.google.com/docs/cloud-messaging/js/client
export const messaging = getMessaging(app)
