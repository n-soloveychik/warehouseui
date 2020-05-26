import { HTTPS } from './https'
import { URI } from './uris'

export const API = {
  login: async (data) => await HTTPS.post(URI.V1.LOGIN, data),
  checkLogin: async (data) => await HTTPS.post(URI.V1.CHECK_TOKEN, data),
}
