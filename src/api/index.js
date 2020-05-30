import { HTTPS } from './https'
import { URI } from './uris'

export const REQUEST = {
  login: async (data) => await HTTPS.post(URI.V1.LOGIN, data),
  checkToken: async () => await HTTPS.post(URI.V1.CHECK_TOKEN),
  getAvailableOrders: async () => await HTTPS.get(URI.V1.ORDER.AVAILABLE(1)),
  createOrder: async (order) => await HTTPS.post(URI.V1.ORDER.CREATE, order),
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
  closeClaim: async (claimId) => HTTPS.delete(URI.V1.ITEM.CLAIM.CLOSE(claimId)),
  getTemplateInvoices: async () => HTTPS.get(URI.V1.TEMPLATE.INVOICES.GET),
  createTemplateInvoice: async (invoice) =>
    HTTPS.post(URI.V1.TEMPLATE.INVOICES.CREATE, invoice),
  getTemplateItems: async (invoiceId) =>
    HTTPS.get(URI.V1.TEMPLATE.ITEMS.GET(invoiceId)),
  getItemCategories: async () => HTTPS.get(URI.V1.TEMPLATE.ITEMS.CATEGORIES),
  getItemsOfCategory: async (categoryId) =>
    HTTPS.get(URI.V1.TEMPLATE.ITEMS.GET_OF_CATEGORY(categoryId)),
  createTemplateItem: async (item) =>
    HTTPS.post(URI.V1.TEMPLATE.ITEMS.CREATE, item),
  addTemplateItemToInvoice: async (invoiceId, itemId, { lot, count }) =>
    HTTPS.post(URI.V1.TEMPLATE.INVOICES.ADD_ITEM(invoiceId, itemId), {
      lot,
      count,
    }),
  removeTemplateItemFromInvoice: async (invoiceId, itemId) =>
    HTTPS.delete(URI.V1.TEMPLATE.INVOICES.REMOVE_ITEM(invoiceId, itemId)),
}
