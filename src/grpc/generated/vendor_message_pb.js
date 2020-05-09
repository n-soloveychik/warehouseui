/* eslint-disable */
// source: vendor_message.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf')
var goog = jspb
var global = Function('return this')()

goog.exportSymbol('proto.order.GetStoredVendorCodesRequest', null, global)
goog.exportSymbol('proto.order.VendorCode', null, global)
goog.exportSymbol('proto.order.VendorCodes', null, global)
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.order.GetStoredVendorCodesRequest = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null)
}
goog.inherits(proto.order.GetStoredVendorCodesRequest, jspb.Message)
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.order.GetStoredVendorCodesRequest.displayName =
    'proto.order.GetStoredVendorCodesRequest'
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.order.VendorCode = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null)
}
goog.inherits(proto.order.VendorCode, jspb.Message)
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.order.VendorCode.displayName = 'proto.order.VendorCode'
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.order.VendorCodes = function (opt_data) {
  jspb.Message.initialize(
    this,
    opt_data,
    0,
    -1,
    proto.order.VendorCodes.repeatedFields_,
    null,
  )
}
goog.inherits(proto.order.VendorCodes, jspb.Message)
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.order.VendorCodes.displayName = 'proto.order.VendorCodes'
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.order.GetStoredVendorCodesRequest.prototype.toObject = function (
    opt_includeInstance,
  ) {
    return proto.order.GetStoredVendorCodesRequest.toObject(
      opt_includeInstance,
      this,
    )
  }

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.order.GetStoredVendorCodesRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.order.GetStoredVendorCodesRequest.toObject = function (
    includeInstance,
    msg,
  ) {
    var f,
      obj = {
        orderNum: jspb.Message.getFieldWithDefault(msg, 1, ''),
      }

    if (includeInstance) {
      obj.$jspbMessageInstance = msg
    }
    return obj
  }
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.order.GetStoredVendorCodesRequest}
 */
proto.order.GetStoredVendorCodesRequest.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes)
  var msg = new proto.order.GetStoredVendorCodesRequest()
  return proto.order.GetStoredVendorCodesRequest.deserializeBinaryFromReader(
    msg,
    reader,
  )
}

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.order.GetStoredVendorCodesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.order.GetStoredVendorCodesRequest}
 */
proto.order.GetStoredVendorCodesRequest.deserializeBinaryFromReader = function (
  msg,
  reader,
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break
    }
    var field = reader.getFieldNumber()
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString())
        msg.setOrderNum(value)
        break
      default:
        reader.skipField()
        break
    }
  }
  return msg
}

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.order.GetStoredVendorCodesRequest.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter()
  proto.order.GetStoredVendorCodesRequest.serializeBinaryToWriter(this, writer)
  return writer.getResultBuffer()
}

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.order.GetStoredVendorCodesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.order.GetStoredVendorCodesRequest.serializeBinaryToWriter = function (
  message,
  writer,
) {
  var f = undefined
  f = message.getOrderNum()
  if (f.length > 0) {
    writer.writeString(1, f)
  }
}

/**
 * optional string order_num = 1;
 * @return {string}
 */
proto.order.GetStoredVendorCodesRequest.prototype.getOrderNum = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ''))
}

/**
 * @param {string} value
 * @return {!proto.order.GetStoredVendorCodesRequest} returns this
 */
proto.order.GetStoredVendorCodesRequest.prototype.setOrderNum = function (
  value,
) {
  return jspb.Message.setProto3StringField(this, 1, value)
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.order.VendorCode.prototype.toObject = function (opt_includeInstance) {
    return proto.order.VendorCode.toObject(opt_includeInstance, this)
  }

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.order.VendorCode} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.order.VendorCode.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        vendorCode: jspb.Message.getFieldWithDefault(msg, 1, ''),
        orderNum: jspb.Message.getFieldWithDefault(msg, 2, ''),
      }

    if (includeInstance) {
      obj.$jspbMessageInstance = msg
    }
    return obj
  }
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.order.VendorCode}
 */
proto.order.VendorCode.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes)
  var msg = new proto.order.VendorCode()
  return proto.order.VendorCode.deserializeBinaryFromReader(msg, reader)
}

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.order.VendorCode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.order.VendorCode}
 */
proto.order.VendorCode.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break
    }
    var field = reader.getFieldNumber()
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString())
        msg.setVendorCode(value)
        break
      case 2:
        var value = /** @type {string} */ (reader.readString())
        msg.setOrderNum(value)
        break
      default:
        reader.skipField()
        break
    }
  }
  return msg
}

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.order.VendorCode.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter()
  proto.order.VendorCode.serializeBinaryToWriter(this, writer)
  return writer.getResultBuffer()
}

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.order.VendorCode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.order.VendorCode.serializeBinaryToWriter = function (message, writer) {
  var f = undefined
  f = message.getVendorCode()
  if (f.length > 0) {
    writer.writeString(1, f)
  }
  f = message.getOrderNum()
  if (f.length > 0) {
    writer.writeString(2, f)
  }
}

/**
 * optional string vendor_code = 1;
 * @return {string}
 */
proto.order.VendorCode.prototype.getVendorCode = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ''))
}

/**
 * @param {string} value
 * @return {!proto.order.VendorCode} returns this
 */
proto.order.VendorCode.prototype.setVendorCode = function (value) {
  return jspb.Message.setProto3StringField(this, 1, value)
}

/**
 * optional string order_num = 2;
 * @return {string}
 */
proto.order.VendorCode.prototype.getOrderNum = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ''))
}

/**
 * @param {string} value
 * @return {!proto.order.VendorCode} returns this
 */
proto.order.VendorCode.prototype.setOrderNum = function (value) {
  return jspb.Message.setProto3StringField(this, 2, value)
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.order.VendorCodes.repeatedFields_ = [1]

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.order.VendorCodes.prototype.toObject = function (opt_includeInstance) {
    return proto.order.VendorCodes.toObject(opt_includeInstance, this)
  }

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.order.VendorCodes} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.order.VendorCodes.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        vendorCodesList: jspb.Message.toObjectList(
          msg.getVendorCodesList(),
          proto.order.VendorCode.toObject,
          includeInstance,
        ),
      }

    if (includeInstance) {
      obj.$jspbMessageInstance = msg
    }
    return obj
  }
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.order.VendorCodes}
 */
proto.order.VendorCodes.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes)
  var msg = new proto.order.VendorCodes()
  return proto.order.VendorCodes.deserializeBinaryFromReader(msg, reader)
}

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.order.VendorCodes} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.order.VendorCodes}
 */
proto.order.VendorCodes.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break
    }
    var field = reader.getFieldNumber()
    switch (field) {
      case 1:
        var value = new proto.order.VendorCode()
        reader.readMessage(
          value,
          proto.order.VendorCode.deserializeBinaryFromReader,
        )
        msg.addVendorCodes(value)
        break
      default:
        reader.skipField()
        break
    }
  }
  return msg
}

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.order.VendorCodes.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter()
  proto.order.VendorCodes.serializeBinaryToWriter(this, writer)
  return writer.getResultBuffer()
}

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.order.VendorCodes} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.order.VendorCodes.serializeBinaryToWriter = function (message, writer) {
  var f = undefined
  f = message.getVendorCodesList()
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.order.VendorCode.serializeBinaryToWriter,
    )
  }
}

/**
 * repeated VendorCode vendor_codes = 1;
 * @return {!Array<!proto.order.VendorCode>}
 */
proto.order.VendorCodes.prototype.getVendorCodesList = function () {
  return /** @type{!Array<!proto.order.VendorCode>} */ (jspb.Message.getRepeatedWrapperField(
    this,
    proto.order.VendorCode,
    1,
  ))
}

/**
 * @param {!Array<!proto.order.VendorCode>} value
 * @return {!proto.order.VendorCodes} returns this
 */
proto.order.VendorCodes.prototype.setVendorCodesList = function (value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value)
}

/**
 * @param {!proto.order.VendorCode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.order.VendorCode}
 */
proto.order.VendorCodes.prototype.addVendorCodes = function (
  opt_value,
  opt_index,
) {
  return jspb.Message.addToRepeatedWrapperField(
    this,
    1,
    opt_value,
    proto.order.VendorCode,
    opt_index,
  )
}

/**
 * Clears the list making it empty but non-null.
 * @return {!proto.order.VendorCodes} returns this
 */
proto.order.VendorCodes.prototype.clearVendorCodesList = function () {
  return this.setVendorCodesList([])
}

goog.object.extend(exports, proto.order)
