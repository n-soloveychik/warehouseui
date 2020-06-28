import { ROUTER } from "../actions/actionNames";

const initialState = {
  authorized: true,
};

const obj = {
  [ROUTER.UNAUTHORIZED]: (state) => ({ ...state, authorized: false }),
  [ROUTER.AUTHORIZED]: (state) => ({ ...state, authorized: true }),
};

export default (state = initialState, action) => {
  return action.type && obj[action.type]
    ? obj[action.type](state, action)
    : state;
};
