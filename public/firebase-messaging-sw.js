importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyAP_Nr9rkSJ0g7hvQKbjQI9UH_Jy6kK_u0',
  authDomain: 'matricula-ufsc.firebaseapp.com',
  projectId: 'matricula-ufsc',
  storageBucket: 'matricula-ufsc.appspot.com',
  messagingSenderId: '544318734893',
  appId: '1:544318734893:web:5f826baad5a07047f32ea4',
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
firebase.initializeApp(firebaseConfig)
firebase.messaging()
