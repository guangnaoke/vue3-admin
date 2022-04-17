const TokenKey = 'token'
const LanguageKey = 'language'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getLocalLanguage() {
  return sessionStorage.getItem(LanguageKey)
}

export function setLocalLanguage(key) {
  return sessionStorage.setItem(LanguageKey, key)
}
