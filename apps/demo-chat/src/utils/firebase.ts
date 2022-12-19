import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDfiTDalAYUF5fjAFKjHtwOUJKIfqcydQA',
  authDomain: 'stadium-demo-chat.firebaseapp.com',
  projectId: 'stadium-demo-chat',
  storageBucket: 'stadium-demo-chat.appspot.com',
  messagingSenderId: '192309278182',
  appId: '1:192309278182:web:e1d28964dc929cf0a99227'
}

const VAPID_KEY = 'BNu-Vl6q2xXiFWCZBItIH18VP093IJh3-hp0ZQolvjLO5adzro4WWYuoeNruNCuBHn2dv3DYcrZ4-4pEhjSmXH0'

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export async function getFirebaseToken (): Promise<string | undefined> {
  const status = await Notification.requestPermission()

  if (status !== 'granted') {
    return
  }

  const messaging = getMessaging(app) as any
  // const tokenFromStorage = await localforage.getItem(STORAGE_NAMESPACE_KEY)

  // if (typeof tokenFromStorage === 'string') {
  //   return tokenFromStorage
  // }

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY
  })

  // eslint-disable-next-line no-console
  console.log({
    newToken: token
  })

  if (!token) {
    return
  }

  // await localforage.setItem(STORAGE_NAMESPACE_KEY, token)
  return token
}
