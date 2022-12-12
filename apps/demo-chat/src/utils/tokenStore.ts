import Cookies from 'js-cookie'

export const NAMESPACE = 'demo-chat-token'

const COOKIE_OPTIONS = {
  secure: true
}

export const getToken = (): string | undefined => {
  return Cookies.get(NAMESPACE)
}

export const setToken = (token: string) => {
  return Cookies.set(NAMESPACE, token, COOKIE_OPTIONS)
}

export const clearToken = () => {
  return Cookies.remove(NAMESPACE, COOKIE_OPTIONS)
}
