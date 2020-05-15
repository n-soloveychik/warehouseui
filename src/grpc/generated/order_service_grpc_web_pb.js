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


module.exports = proto.order;

