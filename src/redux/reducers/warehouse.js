import {
  SELECT_CURRENT_ORDER,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
} from '@/redux/actions/actionNames'

const initialState = {
  list: {},
  table: [],
  isCallingGetOrders: false,
  isCallingGetItems: false,
  currentOrder: null,
  currentVendorCode: null,
}

const selectOrder = (state, accontContract) => {
  if (!Object.keys(state.list).includes(accontContract))
    return Object.assign({}, state)
  return Object.assign({}, state, {
    currentOrder: accontContract,
    currentVendorCode:
      state.currentOrder === accontContract ? state.currentVendorCode : null,
  })
}

const selectVendorCode = (state, vendorCode) => {
  if (
    !state.currentOrder ||
    !Object.keys(state.list).includes(state.currentOrder) ||
    !vendorCode ||
    !state.list[state.currentOrder].includes(vendorCode)
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
        list: action.data,
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
        table: action.data,
      })
    }
    default: {
      return state
    }
  }
}
