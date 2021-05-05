import {combineReducers} from 'redux';
import recordReducer from './recordReducer';
import accountReducer from './accountReducer';
import reportReducer from './reportTypeReducer';
import categoryReducer from './categoryReducer';
import backupReducer from './backupReducer';

import categoryTypeReducer from './categoryTypeReducer';

const rootReducer = combineReducers({
  record: recordReducer,
  account: accountReducer,
  category: categoryReducer,
  backup: backupReducer,
  selectedReportType: reportReducer,
  selectedCategoryType: categoryTypeReducer,
});

export default rootReducer;
