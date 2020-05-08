import { OrderServiceClient } from './generated/order_service_grpc_web_pb'
import { GetItemsByVendorCodeRequest } from './generated/item_message_pb'
import { GetStoredVendorCodesRequest } from './generated/vendor_message_pb'
import { getVendorCodesHandler } from './vendorCodes/vendorCodesCalls'
import { getItemsHandler } from './item/itemCalls'
import { convertItems } from './convert/items'
import { converVendorCodes } from './convert/vendorCodes'

const client = new OrderServiceClient('http://iopk.in:8080', null, null)

export const grpc = {
  orders: {
    get: () =>
      getVendorCodesHandler(
        client,
        GetStoredVendorCodesRequest,
        converVendorCodes,
      ),
  },
  items: {
    get: (vendorCode) =>
      getItemsHandler(
        client,
        GetItemsByVendorCodeRequest,
        convertItems,
        vendorCode,
      ),
  },
}
