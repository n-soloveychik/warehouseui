/* eslint-disable */
/**
 * @fileoverview gRPC-Web generated client stub for order
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var order_message_pb = require('./order_message_pb.js')

var vendor_message_pb = require('./vendor_message_pb.js')

var item_message_pb = require('./item_message_pb.js')
const proto = {};
proto.order = require('./order_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.order.OrderServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.order.OrderServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.createItemCategoryRequest,
 *   !proto.order.createItemCategoryResponse>}
 */
const methodDescriptor_OrderService_createItemCategory = new grpc.web.MethodDescriptor(
  '/order.OrderService/createItemCategory',
  grpc.web.MethodType.UNARY,
  item_message_pb.createItemCategoryRequest,
  item_message_pb.createItemCategoryResponse,
  /**
   * @param {!proto.order.createItemCategoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.createItemCategoryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.createItemCategoryRequest,
 *   !proto.order.createItemCategoryResponse>}
 */
const methodInfo_OrderService_createItemCategory = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.createItemCategoryResponse,
  /**
   * @param {!proto.order.createItemCategoryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.createItemCategoryResponse.deserializeBinary
);


/**
 * @param {!proto.order.createItemCategoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.createItemCategoryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.createItemCategoryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.createItemCategory =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/createItemCategory',
      request,
      metadata || {},
      methodDescriptor_OrderService_createItemCategory,
      callback);
};


/**
 * @param {!proto.order.createItemCategoryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.createItemCategoryResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.createItemCategory =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/createItemCategory',
      request,
      metadata || {},
      methodDescriptor_OrderService_createItemCategory);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.getItemCategoriesRequest,
 *   !proto.order.getItemCategoriesResponse>}
 */
const methodDescriptor_OrderService_getItemCategories = new grpc.web.MethodDescriptor(
  '/order.OrderService/getItemCategories',
  grpc.web.MethodType.UNARY,
  item_message_pb.getItemCategoriesRequest,
  item_message_pb.getItemCategoriesResponse,
  /**
   * @param {!proto.order.getItemCategoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.getItemCategoriesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.getItemCategoriesRequest,
 *   !proto.order.getItemCategoriesResponse>}
 */
const methodInfo_OrderService_getItemCategories = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.getItemCategoriesResponse,
  /**
   * @param {!proto.order.getItemCategoriesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.getItemCategoriesResponse.deserializeBinary
);


/**
 * @param {!proto.order.getItemCategoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.getItemCategoriesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.getItemCategoriesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.getItemCategories =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/getItemCategories',
      request,
      metadata || {},
      methodDescriptor_OrderService_getItemCategories,
      callback);
};


/**
 * @param {!proto.order.getItemCategoriesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.getItemCategoriesResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getItemCategories =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/getItemCategories',
      request,
      metadata || {},
      methodDescriptor_OrderService_getItemCategories);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.GetItemsByVendorCodeRequest,
 *   !proto.order.Items>}
 */
const methodDescriptor_OrderService_getItemsByVendorCode = new grpc.web.MethodDescriptor(
  '/order.OrderService/getItemsByVendorCode',
  grpc.web.MethodType.UNARY,
  item_message_pb.GetItemsByVendorCodeRequest,
  item_message_pb.Items,
  /**
   * @param {!proto.order.GetItemsByVendorCodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.Items.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.GetItemsByVendorCodeRequest,
 *   !proto.order.Items>}
 */
const methodInfo_OrderService_getItemsByVendorCode = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.Items,
  /**
   * @param {!proto.order.GetItemsByVendorCodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.Items.deserializeBinary
);


/**
 * @param {!proto.order.GetItemsByVendorCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.Items)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.Items>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.getItemsByVendorCode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/getItemsByVendorCode',
      request,
      metadata || {},
      methodDescriptor_OrderService_getItemsByVendorCode,
      callback);
};


/**
 * @param {!proto.order.GetItemsByVendorCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.Items>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getItemsByVendorCode =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/getItemsByVendorCode',
      request,
      metadata || {},
      methodDescriptor_OrderService_getItemsByVendorCode);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.GetStoredOrderCodesRequest,
 *   !proto.order.OrderCodes>}
 */
const methodDescriptor_OrderService_getStoredOrderCodes = new grpc.web.MethodDescriptor(
  '/order.OrderService/getStoredOrderCodes',
  grpc.web.MethodType.UNARY,
  order_message_pb.GetStoredOrderCodesRequest,
  order_message_pb.OrderCodes,
  /**
   * @param {!proto.order.GetStoredOrderCodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  order_message_pb.OrderCodes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.GetStoredOrderCodesRequest,
 *   !proto.order.OrderCodes>}
 */
const methodInfo_OrderService_getStoredOrderCodes = new grpc.web.AbstractClientBase.MethodInfo(
  order_message_pb.OrderCodes,
  /**
   * @param {!proto.order.GetStoredOrderCodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  order_message_pb.OrderCodes.deserializeBinary
);


/**
 * @param {!proto.order.GetStoredOrderCodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.OrderCodes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.OrderCodes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.getStoredOrderCodes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/getStoredOrderCodes',
      request,
      metadata || {},
      methodDescriptor_OrderService_getStoredOrderCodes,
      callback);
};


/**
 * @param {!proto.order.GetStoredOrderCodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.OrderCodes>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getStoredOrderCodes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/getStoredOrderCodes',
      request,
      metadata || {},
      methodDescriptor_OrderService_getStoredOrderCodes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.GetStoredVendorCodesRequest,
 *   !proto.order.VendorCodes>}
 */
const methodDescriptor_OrderService_getStoredVendorCodes = new grpc.web.MethodDescriptor(
  '/order.OrderService/getStoredVendorCodes',
  grpc.web.MethodType.UNARY,
  vendor_message_pb.GetStoredVendorCodesRequest,
  vendor_message_pb.VendorCodes,
  /**
   * @param {!proto.order.GetStoredVendorCodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  vendor_message_pb.VendorCodes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.GetStoredVendorCodesRequest,
 *   !proto.order.VendorCodes>}
 */
const methodInfo_OrderService_getStoredVendorCodes = new grpc.web.AbstractClientBase.MethodInfo(
  vendor_message_pb.VendorCodes,
  /**
   * @param {!proto.order.GetStoredVendorCodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  vendor_message_pb.VendorCodes.deserializeBinary
);


/**
 * @param {!proto.order.GetStoredVendorCodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.VendorCodes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.VendorCodes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.getStoredVendorCodes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/getStoredVendorCodes',
      request,
      metadata || {},
      methodDescriptor_OrderService_getStoredVendorCodes,
      callback);
};


/**
 * @param {!proto.order.GetStoredVendorCodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.VendorCodes>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getStoredVendorCodes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/getStoredVendorCodes',
      request,
      metadata || {},
      methodDescriptor_OrderService_getStoredVendorCodes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.SetItemStatusClaimRequest,
 *   !proto.order.SetItemStatusClaimResponse>}
 */
const methodDescriptor_OrderService_setItemStatusClaim = new grpc.web.MethodDescriptor(
  '/order.OrderService/setItemStatusClaim',
  grpc.web.MethodType.UNARY,
  item_message_pb.SetItemStatusClaimRequest,
  item_message_pb.SetItemStatusClaimResponse,
  /**
   * @param {!proto.order.SetItemStatusClaimRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.SetItemStatusClaimResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.SetItemStatusClaimRequest,
 *   !proto.order.SetItemStatusClaimResponse>}
 */
const methodInfo_OrderService_setItemStatusClaim = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.SetItemStatusClaimResponse,
  /**
   * @param {!proto.order.SetItemStatusClaimRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.SetItemStatusClaimResponse.deserializeBinary
);


/**
 * @param {!proto.order.SetItemStatusClaimRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.SetItemStatusClaimResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.SetItemStatusClaimResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.setItemStatusClaim =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/setItemStatusClaim',
      request,
      metadata || {},
      methodDescriptor_OrderService_setItemStatusClaim,
      callback);
};


/**
 * @param {!proto.order.SetItemStatusClaimRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.SetItemStatusClaimResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.setItemStatusClaim =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/setItemStatusClaim',
      request,
      metadata || {},
      methodDescriptor_OrderService_setItemStatusClaim);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.SetItemStatusInStockRequest,
 *   !proto.order.SetItemStatusInStockResponse>}
 */
const methodDescriptor_OrderService_setItemStatusInStock = new grpc.web.MethodDescriptor(
  '/order.OrderService/setItemStatusInStock',
  grpc.web.MethodType.UNARY,
  item_message_pb.SetItemStatusInStockRequest,
  item_message_pb.SetItemStatusInStockResponse,
  /**
   * @param {!proto.order.SetItemStatusInStockRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.SetItemStatusInStockResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.SetItemStatusInStockRequest,
 *   !proto.order.SetItemStatusInStockResponse>}
 */
const methodInfo_OrderService_setItemStatusInStock = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.SetItemStatusInStockResponse,
  /**
   * @param {!proto.order.SetItemStatusInStockRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.SetItemStatusInStockResponse.deserializeBinary
);


/**
 * @param {!proto.order.SetItemStatusInStockRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.SetItemStatusInStockResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.SetItemStatusInStockResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.setItemStatusInStock =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/setItemStatusInStock',
      request,
      metadata || {},
      methodDescriptor_OrderService_setItemStatusInStock,
      callback);
};


/**
 * @param {!proto.order.SetItemStatusInStockRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.SetItemStatusInStockResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.setItemStatusInStock =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/setItemStatusInStock',
      request,
      metadata || {},
      methodDescriptor_OrderService_setItemStatusInStock);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.SetItemStatusAwaitDeliveryRequest,
 *   !proto.order.SetItemStatusAwaitDeliveryResponse>}
 */
const methodDescriptor_OrderService_setItemStatusAwaitDelivery = new grpc.web.MethodDescriptor(
  '/order.OrderService/setItemStatusAwaitDelivery',
  grpc.web.MethodType.UNARY,
  item_message_pb.SetItemStatusAwaitDeliveryRequest,
  item_message_pb.SetItemStatusAwaitDeliveryResponse,
  /**
   * @param {!proto.order.SetItemStatusAwaitDeliveryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.SetItemStatusAwaitDeliveryResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.SetItemStatusAwaitDeliveryRequest,
 *   !proto.order.SetItemStatusAwaitDeliveryResponse>}
 */
const methodInfo_OrderService_setItemStatusAwaitDelivery = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.SetItemStatusAwaitDeliveryResponse,
  /**
   * @param {!proto.order.SetItemStatusAwaitDeliveryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.SetItemStatusAwaitDeliveryResponse.deserializeBinary
);


/**
 * @param {!proto.order.SetItemStatusAwaitDeliveryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.SetItemStatusAwaitDeliveryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.SetItemStatusAwaitDeliveryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.setItemStatusAwaitDelivery =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/setItemStatusAwaitDelivery',
      request,
      metadata || {},
      methodDescriptor_OrderService_setItemStatusAwaitDelivery,
      callback);
};


/**
 * @param {!proto.order.SetItemStatusAwaitDeliveryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.SetItemStatusAwaitDeliveryResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.setItemStatusAwaitDelivery =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/setItemStatusAwaitDelivery',
      request,
      metadata || {},
      methodDescriptor_OrderService_setItemStatusAwaitDelivery);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.UpdateItemStatusRequest,
 *   !proto.order.UpdateItemStatusResponse>}
 */
const methodDescriptor_OrderService_updateItemStatus = new grpc.web.MethodDescriptor(
  '/order.OrderService/updateItemStatus',
  grpc.web.MethodType.UNARY,
  item_message_pb.UpdateItemStatusRequest,
  item_message_pb.UpdateItemStatusResponse,
  /**
   * @param {!proto.order.UpdateItemStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.UpdateItemStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.UpdateItemStatusRequest,
 *   !proto.order.UpdateItemStatusResponse>}
 */
const methodInfo_OrderService_updateItemStatus = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.UpdateItemStatusResponse,
  /**
   * @param {!proto.order.UpdateItemStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.UpdateItemStatusResponse.deserializeBinary
);


/**
 * @param {!proto.order.UpdateItemStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.UpdateItemStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.UpdateItemStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.updateItemStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/updateItemStatus',
      request,
      metadata || {},
      methodDescriptor_OrderService_updateItemStatus,
      callback);
};


/**
 * @param {!proto.order.UpdateItemStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.UpdateItemStatusResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.updateItemStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/updateItemStatus',
      request,
      metadata || {},
      methodDescriptor_OrderService_updateItemStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.transferItemInVendorRequest,
 *   !proto.order.transferItemInVendorResponse>}
 */
const methodDescriptor_OrderService_transferItemInVendor = new grpc.web.MethodDescriptor(
  '/order.OrderService/transferItemInVendor',
  grpc.web.MethodType.UNARY,
  item_message_pb.transferItemInVendorRequest,
  item_message_pb.transferItemInVendorResponse,
  /**
   * @param {!proto.order.transferItemInVendorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.transferItemInVendorResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.transferItemInVendorRequest,
 *   !proto.order.transferItemInVendorResponse>}
 */
const methodInfo_OrderService_transferItemInVendor = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.transferItemInVendorResponse,
  /**
   * @param {!proto.order.transferItemInVendorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.transferItemInVendorResponse.deserializeBinary
);


/**
 * @param {!proto.order.transferItemInVendorRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.transferItemInVendorResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.transferItemInVendorResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.transferItemInVendor =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/transferItemInVendor',
      request,
      metadata || {},
      methodDescriptor_OrderService_transferItemInVendor,
      callback);
};


/**
 * @param {!proto.order.transferItemInVendorRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.transferItemInVendorResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.transferItemInVendor =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/transferItemInVendor',
      request,
      metadata || {},
      methodDescriptor_OrderService_transferItemInVendor);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.createUnknownItemRequest,
 *   !proto.order.createUnknownItemResponse>}
 */
const methodDescriptor_OrderService_createUnknownItem = new grpc.web.MethodDescriptor(
  '/order.OrderService/createUnknownItem',
  grpc.web.MethodType.UNARY,
  item_message_pb.createUnknownItemRequest,
  item_message_pb.createUnknownItemResponse,
  /**
   * @param {!proto.order.createUnknownItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.createUnknownItemResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.createUnknownItemRequest,
 *   !proto.order.createUnknownItemResponse>}
 */
const methodInfo_OrderService_createUnknownItem = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.createUnknownItemResponse,
  /**
   * @param {!proto.order.createUnknownItemRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.createUnknownItemResponse.deserializeBinary
);


/**
 * @param {!proto.order.createUnknownItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.createUnknownItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.createUnknownItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.createUnknownItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/createUnknownItem',
      request,
      metadata || {},
      methodDescriptor_OrderService_createUnknownItem,
      callback);
};


/**
 * @param {!proto.order.createUnknownItemRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.createUnknownItemResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.createUnknownItem =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/createUnknownItem',
      request,
      metadata || {},
      methodDescriptor_OrderService_createUnknownItem);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.createVendorTemplateRequest,
 *   !proto.order.createVendorTemplateResponse>}
 */
const methodDescriptor_OrderService_createVendorTemplate = new grpc.web.MethodDescriptor(
  '/order.OrderService/createVendorTemplate',
  grpc.web.MethodType.UNARY,
  item_message_pb.createVendorTemplateRequest,
  item_message_pb.createVendorTemplateResponse,
  /**
   * @param {!proto.order.createVendorTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.createVendorTemplateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.createVendorTemplateRequest,
 *   !proto.order.createVendorTemplateResponse>}
 */
const methodInfo_OrderService_createVendorTemplate = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.createVendorTemplateResponse,
  /**
   * @param {!proto.order.createVendorTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.createVendorTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.order.createVendorTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.createVendorTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.createVendorTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.createVendorTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/createVendorTemplate',
      request,
      metadata || {},
      methodDescriptor_OrderService_createVendorTemplate,
      callback);
};


/**
 * @param {!proto.order.createVendorTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.createVendorTemplateResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.createVendorTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/createVendorTemplate',
      request,
      metadata || {},
      methodDescriptor_OrderService_createVendorTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.getVendorTemplatesRequest,
 *   !proto.order.getVendorTemplatesResponse>}
 */
const methodDescriptor_OrderService_getVendorTemplates = new grpc.web.MethodDescriptor(
  '/order.OrderService/getVendorTemplates',
  grpc.web.MethodType.UNARY,
  item_message_pb.getVendorTemplatesRequest,
  item_message_pb.getVendorTemplatesResponse,
  /**
   * @param {!proto.order.getVendorTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.getVendorTemplatesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.getVendorTemplatesRequest,
 *   !proto.order.getVendorTemplatesResponse>}
 */
const methodInfo_OrderService_getVendorTemplates = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.getVendorTemplatesResponse,
  /**
   * @param {!proto.order.getVendorTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.getVendorTemplatesResponse.deserializeBinary
);


/**
 * @param {!proto.order.getVendorTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.getVendorTemplatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.getVendorTemplatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.getVendorTemplates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/getVendorTemplates',
      request,
      metadata || {},
      methodDescriptor_OrderService_getVendorTemplates,
      callback);
};


/**
 * @param {!proto.order.getVendorTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.getVendorTemplatesResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getVendorTemplates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/getVendorTemplates',
      request,
      metadata || {},
      methodDescriptor_OrderService_getVendorTemplates);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.createItemTemplateRequest,
 *   !proto.order.createItemTemplateResponse>}
 */
const methodDescriptor_OrderService_createItemTemplate = new grpc.web.MethodDescriptor(
  '/order.OrderService/createItemTemplate',
  grpc.web.MethodType.UNARY,
  item_message_pb.createItemTemplateRequest,
  item_message_pb.createItemTemplateResponse,
  /**
   * @param {!proto.order.createItemTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.createItemTemplateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.createItemTemplateRequest,
 *   !proto.order.createItemTemplateResponse>}
 */
const methodInfo_OrderService_createItemTemplate = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.createItemTemplateResponse,
  /**
   * @param {!proto.order.createItemTemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.createItemTemplateResponse.deserializeBinary
);


/**
 * @param {!proto.order.createItemTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.createItemTemplateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.createItemTemplateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.createItemTemplate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/createItemTemplate',
      request,
      metadata || {},
      methodDescriptor_OrderService_createItemTemplate,
      callback);
};


/**
 * @param {!proto.order.createItemTemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.createItemTemplateResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.createItemTemplate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/createItemTemplate',
      request,
      metadata || {},
      methodDescriptor_OrderService_createItemTemplate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.order.getItemTemplatesRequest,
 *   !proto.order.getItemTemplatesResponse>}
 */
const methodDescriptor_OrderService_getItemTemplates = new grpc.web.MethodDescriptor(
  '/order.OrderService/getItemTemplates',
  grpc.web.MethodType.UNARY,
  item_message_pb.getItemTemplatesRequest,
  item_message_pb.getItemTemplatesResponse,
  /**
   * @param {!proto.order.getItemTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.getItemTemplatesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.order.getItemTemplatesRequest,
 *   !proto.order.getItemTemplatesResponse>}
 */
const methodInfo_OrderService_getItemTemplates = new grpc.web.AbstractClientBase.MethodInfo(
  item_message_pb.getItemTemplatesResponse,
  /**
   * @param {!proto.order.getItemTemplatesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  item_message_pb.getItemTemplatesResponse.deserializeBinary
);


/**
 * @param {!proto.order.getItemTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.order.getItemTemplatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.getItemTemplatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.getItemTemplates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/getItemTemplates',
      request,
      metadata || {},
      methodDescriptor_OrderService_getItemTemplates,
      callback);
};


/**
 * @param {!proto.order.getItemTemplatesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.getItemTemplatesResponse>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getItemTemplates =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/getItemTemplates',
      request,
      metadata || {},
      methodDescriptor_OrderService_getItemTemplates);
};


module.exports = proto.order;

