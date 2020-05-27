import { HTTPS } from './https'
import { URI } from './uris'

export const REQUEST = {
  login: async (data) => await HTTPS.post(URI.V1.LOGIN, data),
  checkToken: async () => await HTTPS.post(URI.V1.CHECK_TOKEN),
  getAvailableOrders: async () => await HTTPS.get(URI.V1.ORDER.AVAILABLE(1)),
}
