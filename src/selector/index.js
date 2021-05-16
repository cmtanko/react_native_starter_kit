import _ from 'lodash';
import {createSelector} from 'reselect';

const recordList = (state) => state.record;
const accountList = (state) => state.account;
const categoryList = (state) => state.category;
const userList = (state) => state.user;
const backupList = (state) => state.backup;

export const selectUser = createSelector(
  [userList],
  (user) => user && user.list,
);

export const selectBackups = createSelector(
  [backupList],
  (backup) => backup && backup.list[backup.list.length - 1],
);

export const selectRecords = createSelector(
  [recordList],
  (record) => record && record.list,
);

export const selectCategories = createSelector(
  [categoryList],
  (category) => category && category.list,
);

export const selectCategoryLoading = createSelector(
  [categoryList],
  (category) => {
    return category.loading;
  },
);

export const selectAccounts = createSelector([accountList], (account) => {
  return account.list.map((val) => {
    val.balance = val.balance || 0;
    return val;
  });
});

export const selectAccountLoading = createSelector([accountList], (account) => {
  return account.loading;
});

export const selectCurrentBalance = createSelector([accountList], (account) => {
  const allAccounts = account.list.map((val) => {
    val.openingBalance = parseFloat(val.openingBalance);
    return val;
  });

  const currentBalance =
    parseFloat(
      parseFloat(_.sumBy(allAccounts, 'balance')) ||
        0 + parseFloat(_.sumBy(allAccounts, 'openingBalance') || 0),
    ) || 0;

  return currentBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
});
