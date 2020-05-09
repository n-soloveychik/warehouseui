import { OrderServiceClient } from './generated/order_service_grpc_web_pb'
import {
  GetItemsByVendorCodeRequest,
  UpdateItemStatusRequest,
} from './generated/item_message_pb'
import { GetStoredVendorCodesRequest } from './generated/vendor_message_pb'
import { getVendorCodesHandler } from './vendorCodes/vendorCodesCalls'
import { getItemsHandler, updateItemStatusHandler } from './item/itemCalls'

const client = new OrderServiceClient('http://iopk.in:8080', null, null)

export const grpc = {
  orders: {
    get: () => getVendorCodesHandler(client, GetStoredVendorCodesRequest),
  },
  items: {
    get: (vendorCode) =>
      getItemsHandler(client, GetItemsByVendorCodeRequest, vendorCode),
    updateStatus: ({ itemId, statusId }) =>
      updateItemStatusHandler(client, UpdateItemStatusRequest, {
        itemId,
        statusId,
      }),
  },
}
