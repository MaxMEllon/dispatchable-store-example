import _ from 'lodash'
import logger from 'dispatchable-store-logger'
import DispatchableStore from 'dispatchable-store'

export const initialState = {
  subject: '',
  questions: _.times(9, () => ''),
  socket: null,
  tabs: {
    Main: true,
    Config: false,
  },
  enqueteState: 'initial',
  results: null,
}

const store = new DispatchableStore(initialState)

logger(store)

export default store;
