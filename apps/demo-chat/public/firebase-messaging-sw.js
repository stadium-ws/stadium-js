importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyDfiTDalAYUF5fjAFKjHtwOUJKIfqcydQA',
  authDomain: 'stadium-demo-chat.firebaseapp.com',
  projectId: 'stadium-demo-chat',
  storageBucket: 'stadium-demo-chat.appspot.com',
  messagingSenderId: '192309278182',
  appId: '1:192309278182:web:e1d28964dc929cf0a99227'
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
