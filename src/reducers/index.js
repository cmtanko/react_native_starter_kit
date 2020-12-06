import {combineReducers} from 'redux';
import recordReducer from './recordReducer';
import accountReducer from './accountReducer';
import reportReducer from './reportTypeReducer';
import categoryReducer from './categoryReducer';

import categoryTypeReducer from './categoryTypeReducer';

const rootReducer = combineReducers({
  record: recordReducer,
  account: accountReducer,
  category: categoryReducer,
  selectedReportType: reportReducer,
  selectedCategoryType: categoryTypeReducer,
});

export default rootReducer;
