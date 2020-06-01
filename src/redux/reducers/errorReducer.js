import { ERROR } from '../actions/actionNames'

const initialState = {
  opened: false,
  title: '',
  text: '',
}

const obj = {
  [ERROR.OPEN]: (state, { title, text }) => ({
    ...state,
    opened: true,
    title: title || 'Ошибка',
    text,
  }),
  [ERROR.CLOSE]: (state) => ({ ...state, opened: false }),
  DEFAULT: (state) => ({ ...state }),
}

export default function (state = initialState, action) {
  return action.type && obj[action.type]
    ? obj[action.type](state, action)
    : obj.DEFAULT(state)
}
