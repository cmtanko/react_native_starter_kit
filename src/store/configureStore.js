import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '../reducers';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger)),
    // composeEnhancers(applyMiddleware(ReduxThunk), offline(editedOfflineConfig)),
  );
  return store;
}
