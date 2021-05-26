import {combineReducers} from 'redux';
import userReducer from './userReducer';
import recordReducer from './recordReducer';
import backupReducer from './backupReducer';
import accountReducer from './accountReducer';
import settingReducer from './settingReducer';
import reportReducer from './reportTypeReducer';
import categoryReducer from './categoryReducer';
import categoryTypeReducer from './categoryTypeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  record: recordReducer,
  backup: backupReducer,
  setting: settingReducer,
  account: accountReducer,
  category: categoryReducer,
  selectedReportType: reportReducer,
  selectedCategoryType: categoryTypeReducer,
});

export default rootReducer;
