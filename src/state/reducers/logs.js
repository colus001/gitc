import * as Actions from 'state/actions/logs'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_LOGS:
      return [
        ...action.payload,
      ]

    default:
      return state
  }
}

export default reducer
