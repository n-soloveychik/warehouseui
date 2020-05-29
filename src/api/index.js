import { HTTPS } from './https'
import { URI } from './uris'

export const REQUEST = {
  login: async (data) => await HTTPS.post(URI.V1.LOGIN, data),
  checkToken: async () => await HTTPS.post(URI.V1.CHECK_TOKEN),
  getAvailableOrders: async () => await HTTPS.get(URI.V1.ORDER.AVAILABLE(1)),
  getInvoicesAndItemsByOrder: async (orderId) =>
    await HTTPS.get(URI.V1.INVOICES.GET(orderId)),
  setItemStatusInStock: async (itemId) =>
    await HTTPS.put(URI.V1.ITEM.SET_STATUS.IN_STOCK(itemId)),
  setItemStatusAwaitDelivery: async (itemId) =>
    await HTTPS.put(URI.V1.ITEM.SET_STATUS.AWAIT_DELIVERY(itemId)),
  insertImage: async (formData) =>
    await HTTPS.postFormData(URI.V1.PHOTOS.INSERT, formData),
  createClaim: async (itemId, data) =>
    HTTPS.post(URI.V1.ITEM.CLAIM.CREATE(itemId), data),
}
