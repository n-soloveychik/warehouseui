/* eslint-disable */
/**
 * @fileoverview gRPC-Web generated client stub for order
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

const grpc = {}
grpc.web = require('grpc-web')

var order_message_pb = require('./order_message_pb.js')

var vendor_message_pb = require('./vendor_message_pb.js')

var item_message_pb = require('./item_message_pb.js')
const proto = {}
proto.order = require('./order_service_pb.js')

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.order.OrderServiceClient = function (hostname, credentials, options) {
  if (!options) options = {}
  options['format'] = 'text'

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options)

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname
}

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.order.OrderServicePromiseClient = function (
  hostname,
  credentials,
  options,
) {
  if (!options) options = {}
  options['format'] = 'text'

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options)

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname
}

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
  function (request) {
    return request.serializeBinary()
  },
  item_message_pb.Items.deserializeBinary,
)

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
  function (request) {
    return request.serializeBinary()
  },
  item_message_pb.Items.deserializeBinary,
)

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
proto.order.OrderServiceClient.prototype.getItemsByVendorCode = function (
  request,
  metadata,
  callback,
) {
  return this.client_.rpcCall(
    this.hostname_ + '/order.OrderService/getItemsByVendorCode',
    request,
    metadata || {},
    methodDescriptor_OrderService_getItemsByVendorCode,
    callback,
  )
}

/**
 * @param {!proto.order.GetItemsByVendorCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.Items>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getItemsByVendorCode = function (
  request,
  metadata,
) {
  return this.client_.unaryCall(
    this.hostname_ + '/order.OrderService/getItemsByVendorCode',
    request,
    metadata || {},
    methodDescriptor_OrderService_getItemsByVendorCode,
  )
}

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
  function (request) {
    return request.serializeBinary()
  },
  order_message_pb.OrderCodes.deserializeBinary,
)

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
  function (request) {
    return request.serializeBinary()
  },
  order_message_pb.OrderCodes.deserializeBinary,
)

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
proto.order.OrderServiceClient.prototype.getStoredOrderCodes = function (
  request,
  metadata,
  callback,
) {
  return this.client_.rpcCall(
    this.hostname_ + '/order.OrderService/getStoredOrderCodes',
    request,
    metadata || {},
    methodDescriptor_OrderService_getStoredOrderCodes,
    callback,
  )
}

/**
 * @param {!proto.order.GetStoredOrderCodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.OrderCodes>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getStoredOrderCodes = function (
  request,
  metadata,
) {
  return this.client_.unaryCall(
    this.hostname_ + '/order.OrderService/getStoredOrderCodes',
    request,
    metadata || {},
    methodDescriptor_OrderService_getStoredOrderCodes,
  )
}

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
  function (request) {
    return request.serializeBinary()
  },
  vendor_message_pb.VendorCodes.deserializeBinary,
)

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
  function (request) {
    return request.serializeBinary()
  },
  vendor_message_pb.VendorCodes.deserializeBinary,
)

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
proto.order.OrderServiceClient.prototype.getStoredVendorCodes = function (
  request,
  metadata,
  callback,
) {
  return this.client_.rpcCall(
    this.hostname_ + '/order.OrderService/getStoredVendorCodes',
    request,
    metadata || {},
    methodDescriptor_OrderService_getStoredVendorCodes,
    callback,
  )
}

/**
 * @param {!proto.order.GetStoredVendorCodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.VendorCodes>}
 *     A native promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.getStoredVendorCodes = function (
  request,
  metadata,
) {
  return this.client_.unaryCall(
    this.hostname_ + '/order.OrderService/getStoredVendorCodes',
    request,
    metadata || {},
    methodDescriptor_OrderService_getStoredVendorCodes,
  )
}

module.exports = proto.order
