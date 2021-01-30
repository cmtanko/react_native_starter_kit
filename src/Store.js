import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk, logger)),
  // composeEnhancers(applyMiddleware(ReduxThunk), offline(editedOfflineConfig)),
);

export default store;
