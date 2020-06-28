import { API, APP } from "@/redux/actions/actionNames";

const initialState = {
  orders: [],
  currentOrder: null,
  claims: [],
};

const successCloseClaim = (state, data) => {
  const newState = { ...state };
  newState.claims = { ...newState.claims };
  const claimIndex = newState.claims[data.invoice_code].findIndex(
    (claim) => claim.claim_id === data.claim_id
  );
  if (~claimIndex) {
    newState.claims[data.invoice_code][claimIndex] = {
      ...newState.claims[data.invoice_code][claimIndex],
      closed: true,
    };
  }
  return newState;
};

const obj = {
  [API.CLAIMS_ORDERS.GET.CALL]: (state) => state,
  [API.CLAIMS_ORDERS.GET.SUCCESS]: (state, { data }) => ({
    ...state,
    orders: data,
  }),
  [API.CLAIMS_ORDERS.GET.FAILURE]: (state) => state,
  [API.CLAIMS.GET.CALL]: (state) => state,
  [API.CLAIMS.GET.SUCCESS]: (state, { data }) => ({ ...state, claims: data }),
  [API.CLAIMS.GET.FAILURE]: (state) => state,
  [APP.CLAIMS_ORDERS.CURRENT.SELECT]: (state, { orderId }) => ({
    ...state,
    currentOrder: orderId,
  }),
  [API.CLAIM.CLOSE.CALL]: (state) => state,
  [API.CLAIM.CLOSE.SUCCESS]: (state, { data }) =>
    successCloseClaim(state, data),
  [API.CLAIM.CLOSE.FAILURE]: (state) => state,
};

export default (state = initialState, action) => {
  return obj[action.type] ? obj[action.type](state, action) : state;
};
