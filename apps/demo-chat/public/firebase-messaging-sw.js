importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
)

const firebaseConfig = {
  apiKey: 'AIzaSyDfiTDalAYUF5fjAFKjHtwOUJKIfqcydQA',
  authDomain: 'stadium-demo-chat.firebaseapp.com',
  projectId: 'stadium-demo-chat',
  storageBucket: 'stadium-demo-chat.appspot.com',
  messagingSenderId: '192309278182',
  appId: '1:192309278182:web:e1d28964dc929cf0a99227'
}

// eslint-disable-next-line no-console
console.log('init firebase')

firebase.initializeApp(firebaseConfig)

// eslint-disable-next-line no-console
console.log('firebase initialized')

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  // eslint-disable-next-line no-console
  console.log('onBackgroundMessage', payload)

  self.registration.showNotification(notificationTitle, notificationOptions)
})

messaging.onMessage(function(payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  // eslint-disable-next-line no-console
  console.log('onMessage', payload)

  self.registration.showNotification(notificationTitle, notificationOptions)
})
