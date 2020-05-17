import { OrderServiceClient } from './generated/order_service_grpc_web_pb'
import { ImageServiceClient } from './generated/image_service_grpc_web_pb'
import {
  GetItemsByVendorCodeRequest,
  UpdateItemStatusRequest,
  SetItemStatusClaimRequest,
  getVendorTemplatesRequest,
  createVendorTemplateRequest,
  getItemTemplatesByVendorIdRequest,
  createItemCategoryRequest,
  getItemCategoriesRequest,
  createItemTemplateRequest,
} from './generated/item_message_pb'
import { GetStoredVendorCodesRequest } from './generated/vendor_message_pb'
import { getVendorCodesHandler } from './modules/vendorCodesCalls'
import { Image } from './generated/image_message_pb'
import { getItemsHandler, updateItemStatusHandler } from './modules/itemCalls'
import { uploadImageHandler } from './modules/imageCalls'
import { createClaim } from './modules/claimCalls'
import {
  getVendorTemplatesHandler,
  createVendorTemplateHandler,
  getItemTemplatesByVendorCodeHandler,
  createCategoryHandler,
  getCategoriesHandler,
  createItemHandler,
} from './modules/templateCalls'

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
  },
  image: {
    upload: (image) => uploadImageHandler(clientImage, Image, { image }),
  },
  claim: {
    create: ({ itemId, description, images }) =>
      createClaim(client, SetItemStatusClaimRequest, {
        itemId,
        description,
        images,
      }),
  },
  template: {
    vendor: {
      get: () => getVendorTemplatesHandler(client, getVendorTemplatesRequest),
      create: (vendorCode) =>
        createVendorTemplateHandler(
          client,
          createVendorTemplateRequest,
          vendorCode,
        ),
    },
    item: {
      getByVendor: (vendorId) =>
        getItemTemplatesByVendorCodeHandler(
          client,
          getItemTemplatesByVendorIdRequest,
          vendorId,
        ),
      create: (item) =>
        createItemHandler(client, createItemTemplateRequest, item),
    },
    category: {
      create: (categoryName) =>
        createCategoryHandler(client, createItemCategoryRequest, categoryName),
      get: () => getCategoriesHandler(client, getItemCategoriesRequest),
    },
  },
}
