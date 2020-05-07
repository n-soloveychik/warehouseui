import {
  SELECT_CURRENT_ACCOUNT_CONTRACT,
  SELECT_CURRENT_VENDOR_CODE,
  GRPC,
} from '@/redux/actions/actionNames'

const initialState = {
  list: {},
  table: [
    { type: 'Фанера' },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    { type: 'Фанера' },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    { type: 'Фанера' },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    { type: 'Фанера' },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    { type: 'Фанера' },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
    {
      lot: '01-001',
      status: 0,
      vendor_code: '0000.0000.6543',
      image: '',
      size: '723*720*21',
      count: '1',
      weight: '6.5',
      description: '3000 Огненно-красный',
    },
  ],
  isCallingGetOrders: false,
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
    case SELECT_CURRENT_ACCOUNT_CONTRACT: {
      return selectOrder(state, action.order)
    }
    case SELECT_CURRENT_VENDOR_CODE: {
      return selectVendorCode(state, action.vendorCode)
    }
    case GRPC.ACCOUNT_CONTRACT.GET.CALL: {
      return Object.assign({}, state, {
        isCallingGetOrders: true,
      })
    }
    case GRPC.ACCOUNT_CONTRACT.GET.FAILURE: {
      return Object.assign({}, state, {
        isCallingGetOrders: false,
      })
    }
    case GRPC.ACCOUNT_CONTRACT.GET.SUCCESS: {
      return Object.assign({}, state, {
        isCallingGetOrders: false,
        list: action.data,
      })
    }
    default: {
      return state
    }
  }
}
