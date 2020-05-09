import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
} from '@/redux/actions/actionNames'

const initialState = {
  vendorCodes: [],
  items: [],
  isCallingGetOrders: false,
  isCallingGetItems: false,
  currentOrder: null,
  currentVendorCode: null,
}

const selectOrder = (state, orderNum) => {
  if (!state.vendorCodes.find((vendor) => vendor.orderNum === orderNum))
    return Object.assign({}, state)
  return Object.assign({}, state, {
    currentOrder: orderNum,
    currentVendorCode:
      state.currentOrder === orderNum ? state.currentVendorCode : null,
  })
}

const selectVendorCode = (state, vendorCode) => {
  if (
    !state.currentOrder ||
    !state.vendorCodes.find(
      (vendor) => vendor.orderNum === state.currentOrder,
    ) ||
    !vendorCode ||
    !state.vendorCodes.find((vendor) => vendor.vendorCode === vendorCode)
  ) {
    return Object.assign({}, state)
  }
  return Object.assign({}, state, {
    currentVendorCode: vendorCode,
  })
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_CURRENT_ORDER: {
      return selectOrder(state, action.order)
    }
    case SELECT_CURRENT_VENDOR_CODE: {
      return selectVendorCode(state, action.vendorCode)
    }
    case GRPC.ORDERS.GET.CALL: {
      return Object.assign({}, state, {
        isCallingGetOrders: true,
      })
    }
    case GRPC.ORDERS.GET.FAILURE: {
      return Object.assign({}, state, {
        isCallingGetOrders: false,
      })
    }
    case GRPC.ORDERS.GET.SUCCESS: {
      return Object.assign({}, state, {
        isCallingGetOrders: false,
        vendorCodes: action.data,
      })
    }
    case GRPC.ITEMS.GET.CALL: {
      return Object.assign({}, state, {
        isCallingGetItems: true,
      })
    }
    case GRPC.ITEMS.GET.FAILURE: {
      return Object.assign({}, state, {
        isCallingGetItems: false,
      })
    }
    case GRPC.ITEMS.GET.SUCCESS: {
      return Object.assign({}, state, {
        isCallingGetItems: false,
        items: action.data,
      })
    }
    case GRPC.ITEMS.UPDATE.CALL: {
      return state
    }
    case GRPC.ITEMS.UPDATE.FAILURE: {
      return state
    }
    case GRPC.ITEMS.UPDATE.SUCCESS: {
      const newState = Object.assign({}, state)
      const item = newState.items.find(
        (item) => item.itemId === action.data.itemId,
      )
      item.statusId = action.data.statusId
      return newState
    }
    default: {
      return state
    }
  }
}
