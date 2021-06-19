import {combineReducers} from 'redux';
import userReducer from './userReducer';
import introReducer from './introReducer';
import recordReducer from './recordReducer';
import backupReducer from './backupReducer';
import accountReducer from './accountReducer';
import settingReducer from './settingReducer';
import reportReducer from './reportTypeReducer';
import categoryReducer from './categoryReducer';

import accountTypeReducer from './accountTypeReducer';
import categoryTypeReducer from './categoryTypeReducer';
import selectedItemReducer from './selectedItemReducer';

const rootReducer = combineReducers({
  user: userReducer,
  intro: introReducer,
  record: recordReducer,
  backup: backupReducer,
  setting: settingReducer,
  account: accountReducer,
  category: categoryReducer,
  selectedReportType: reportReducer,
  selectedItem: selectedItemReducer,
  selectedAccountType: accountTypeReducer,
  selectedCategoryType: categoryTypeReducer,
});

export default rootReducer;
