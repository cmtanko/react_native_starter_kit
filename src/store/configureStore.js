// import axios from 'axios';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from '../reducers';
// import {offline} from '@redux-offline/redux-offline';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

// const effect = (theEffect, _action) => axios(theEffect);

// // Check if the sync/api action failed,
// const discard = (error, _action, _retries) => {
//   const {request, response} = error;

//   if (!request) {
//     throw error;
//   } // There was an error creating the request
//   if (!response) {
//     return false;
//   } // There was no response
//   return response.status >= 400 && response.status < 500;
// };

// const editedOfflineConfig = {
//   ...offlineConfig,
//   effect,
//   discard,
//   returnPromises: true,
// };

export default function configureStore() {
  const store = createStore(
    rootReducer,
    // composeWithDevTools(
    //   applyMiddleware(thunk, logger),
    //   offline(editedOfflineConfig),
    // ),
    // composeEnhancers(applyMiddleware(ReduxThunk), offline(editedOfflineConfig)),
  );
  return store;
}
