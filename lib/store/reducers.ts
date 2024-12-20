import { combineReducers } from 'redux';

import { reduxAPI } from './api/root';

const rootReducer = combineReducers({
  [reduxAPI.reducerPath]: reduxAPI.reducer,
});

export default rootReducer;
