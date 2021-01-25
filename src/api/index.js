import { HTTPS } from './https'
import { URI } from './uris'

export const REQUEST = {
  login: async (data) => await HTTPS.post(URI.V1.LOGIN, data),
  checkToken: async () => await HTTPS.post(URI.V1.CHECK_TOKEN),
  getAvailableOrders: async () => await HTTPS.get(URI.V1.ORDER.AVAILABLE(1)),
  getClaimsOrders: async () => await HTTPS.get(URI.V1.ORDER.ALL(1)),
  createOrder: async (order) => await HTTPS.post(URI.V1.ORDER.CREATE, order),
  deleteOrder: async (order_id) =>
    await HTTPS.delete(URI.V1.ORDER.DELETE(order_id)),
  getOrderClaims: async (order_id) =>
    await HTTPS.get(URI.V1.ORDER.CLAIMS(order_id)),
  getInvoicesAndItemsByOrder: async (orderId) =>
    await HTTPS.get(URI.V1.INVOICES.GET(orderId)),
  setItemCountInStock: async (itemId, data) =>
    await HTTPS.put(URI.V1.ITEM.COUNT_IN_STOCK.SET(itemId), data),
  setItemCountShipment: async (itemId, data) =>
    await HTTPS.put(URI.V1.ITEM.COUNT_SHIPMENT.SET(itemId), data),
  setItemCategoryShipment: async ({ invoice_id, category_id }) =>
    await HTTPS.put(
      URI.V1.ITEMS.CATEGORY.SET_SHIPMENT({ invoice_id, category_id })
    ),
  getItemTransferHistory: async (item_id) =>
    await HTTPS.get(URI.V1.ITEM.TRANSFER_HISTORY(item_id)),
  getAvailableTransfer: async (item_id) =>
    await HTTPS.get(URI.V1.ITEM.TRANSFER.GET_AVAILABLE(item_id)),
  supplementItem: async (item_id, data) =>
    await HTTPS.post(URI.V1.ITEM.TRANSFER.SUPPLEMENT(item_id), data),
  setMultipleItemsFullInStock: async (data) =>
    await HTTPS.put(URI.V1.ITEMS.SET_MULTIPLE.FULL_IN_STOCK, data),
  insertImage: async (formData) =>
    await HTTPS.postFormData(URI.V1.PHOTOS.INSERT, formData),
  createClaim: async (itemId, data) =>
    HTTPS.post(URI.V1.ITEM.CLAIM.CREATE(itemId), data),
  closeClaim: async (claimId) => HTTPS.delete(URI.V1.ITEM.CLAIM.CLOSE(claimId)),
  getTemplateInvoices: async (searchStr) =>
    HTTPS.get(URI.V1.TEMPLATE.INVOICES.GET, { search: searchStr }),
  getTemplateMountingTypes: async (invoiceId) =>
    HTTPS.get(URI.V1.TEMPLATE.MOUNTING_TYPES.GET(invoiceId)),
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
  updateTemplateItemImage: async (itemId, image) =>
    HTTPS.put(URI.V1.TEMPLATE.ITEMS.UPDATE_IMAGE(itemId), image),
  updateTemplateItemField: async (field, invoiceId, itemId, data) =>
    ({
      lot: () =>
        HTTPS.put(URI.V1.TEMPLATE.ITEMS.UPDATE_LOT(invoiceId, itemId), data),
      count: () =>
        HTTPS.put(URI.V1.TEMPLATE.ITEMS.UPDATE_COUNT(invoiceId, itemId), data),
      size: () => HTTPS.put(URI.V1.TEMPLATE.ITEMS.UPDATE_SIZE(itemId), data),
    }[field]()),
  updateTemplateItemCategory: async (itemId, categoryId) =>
    HTTPS.put(URI.V1.TEMPLATE.ITEM.UPDATE_CATEGORY(itemId, categoryId)),
}
