import { OrderServiceClient } from './generated/order_service_grpc_web_pb'
import { ImageServiceClient } from './generated/image_service_grpc_web_pb'
import {
  GetItemsByVendorCodeRequest,
  UpdateItemStatusRequest,
  SetItemStatusClaimRequest,
} from './generated/item_message_pb'
import { GetStoredVendorCodesRequest } from './generated/vendor_message_pb'
import { getVendorCodesHandler } from './vendorCodes/vendorCodesCalls'
import { Image } from './generated/image_message_pb'
import {
  getItemsHandler,
  updateItemStatusHandler,
  setItemStatusClaim,
} from './item/itemCalls'
import { uploadImageHandler } from './image/imageCalls'

const client = new OrderServiceClient('http://iopk.in:8080', null, null)
const clientImage = new ImageServiceClient('http://iopk.in:8080', null, null)

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
    setClaim: ({ itemId, images, description }) => {
      setItemStatusClaim(client, SetItemStatusClaimRequest, {
        itemId,
        images,
        description,
      })
    },
  },
  image: {
    upload: (image) => uploadImageHandler(clientImage, Image, { image }),
  },
}
