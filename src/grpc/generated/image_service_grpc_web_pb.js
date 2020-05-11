/* eslint-disable */
/**
 * @fileoverview gRPC-Web generated client stub for image
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var image_message_pb = require('./image_message_pb.js')
const proto = {};
proto.image = require('./image_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.image.ImageServiceClient =
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
proto.image.ImageServicePromiseClient =
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
 *   !proto.image.Image,
 *   !proto.image.UploadImageResponse>}
 */
const methodDescriptor_ImageService_uploadImage = new grpc.web.MethodDescriptor(
  '/image.ImageService/uploadImage',
  grpc.web.MethodType.UNARY,
  image_message_pb.Image,
  image_message_pb.UploadImageResponse,
  /**
   * @param {!proto.image.Image} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  image_message_pb.UploadImageResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.image.Image,
 *   !proto.image.UploadImageResponse>}
 */
const methodInfo_ImageService_uploadImage = new grpc.web.AbstractClientBase.MethodInfo(
  image_message_pb.UploadImageResponse,
  /**
   * @param {!proto.image.Image} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  image_message_pb.UploadImageResponse.deserializeBinary
);


/**
 * @param {!proto.image.Image} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.image.UploadImageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.image.UploadImageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.image.ImageServiceClient.prototype.uploadImage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/image.ImageService/uploadImage',
      request,
      metadata || {},
      methodDescriptor_ImageService_uploadImage,
      callback);
};


/**
 * @param {!proto.image.Image} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.image.UploadImageResponse>}
 *     A native promise that resolves to the response
 */
proto.image.ImageServicePromiseClient.prototype.uploadImage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/image.ImageService/uploadImage',
      request,
      metadata || {},
      methodDescriptor_ImageService_uploadImage);
};


module.exports = proto.image;

