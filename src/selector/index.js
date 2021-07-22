import _ from 'lodash';
import moment from 'moment';
import {createSelector} from 'reselect';

const recordList = (state) => state.record;
const accountList = (state) => state.account;
const categoryList = (state) => state.category;
const userList = (state) => state.user;
const backupList = (state) => state.backup;
const setting = (state) => state.setting;
const selectedReportType = (state) => state.selectedReportType;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const selectSetting = createSelector(
  [setting],
  (set) => set && set.preference,
);

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

export const selectExpenseData = createSelector(
  [categoryList, recordList, selectedReportType],
  (category, record, reportType) => {
    const WEEK_TO_DATE = {
      WEEKLY: 7,
      MONTHLY: 30,
      YEARLY: 365,
    };

    const expenseCategories = category.list.filter((obj) => {
      return obj.type === 'EXPENSE';
    });

    return expenseCategories
      .map((cat) => {
        let recordByCategory = record.list.filter((rec) => {
          const todayDate = moment();
          const recordDate = moment(rec.date);
          const dateDiff = todayDate.diff(recordDate, 'days');

          return (
            rec.categoryId === cat.id && dateDiff < WEEK_TO_DATE[reportType]
          );
        });

        let sumOfIncome = 0;

        _.each(recordByCategory, (r) => {
          sumOfIncome += parseFloat(r.amount);
        });

        return {
          name: sumOfIncome > 0 ? cat.title + ' $' + sumOfIncome : ' ',
          label: cat.title,
          y: sumOfIncome > 0 ? parseInt(sumOfIncome, 10) : 0,
        };
      })
      .filter((r) => r.y > 0);
  },
);

export const selectIncomeData = createSelector(
  [categoryList, recordList, selectedReportType],
  (category, record, reportType) => {
    const WEEK_TO_DATE = {
      WEEKLY: 7,
      MONTHLY: 30,
      YEARLY: 365,
    };

    const expenseCategories = category.list.filter((obj) => {
      return obj.type === 'INCOME';
    });

    return expenseCategories
      .map((cat) => {
        let recordByCategory = record.list.filter((rec) => {
          const todayDate = moment();
          const recordDate = moment(rec.date);
          const dateDiff = todayDate.diff(recordDate, 'days');

          return (
            rec.categoryId === cat.id && dateDiff < WEEK_TO_DATE[reportType]
          );
        });

        let sumOfIncome = 0;

        _.each(recordByCategory, (r) => {
          sumOfIncome += parseFloat(r.amount);
        });

        return {
          name: sumOfIncome > 0 ? cat.title + ' $' + sumOfIncome : ' ',
          label: cat.title,
          y: sumOfIncome > 0 ? parseInt(sumOfIncome, 10) : 0,
        };
      })
      .filter((r) => r.y > 0);
  },
);

export const selectRecordGroupedByCategoryAndYear = createSelector(
  [categoryList, recordList],
  (category, records) => {
    const recordByCategoryArray = category.list.map((cat) => {
      return {
        [cat.id]: [
          MONTHS.map((m, i) => {
            return {
              key: cat.id,
              x: m,
              w: records.list.filter(
                (r) =>
                  new Date(r.date).getMonth() === i && r.categoryId === cat.id,
              ),
              y:
                records.list
                  .filter(
                    (r) =>
                      new Date(r.date).getMonth() === i &&
                      r.categoryId === cat.id,
                  )
                  .reduce((acc, cv) => acc + cv.amount, 0) || 0,
            };
          }),
        ],
      };
    });

    let recordByCategoryObject = recordByCategoryArray.reduce((obj, item) => {
      obj[Object.keys(item)[0]] = Object.values(item)[0][0];
      return obj;
    }, {});

    return recordByCategoryObject;
  },
);

export const selectTransactions = createSelector(
  [categoryList, accountList, recordList],
  (category, account, record) => {
    return record.list.map((r) => {
      return {
        ...r,
        category: category.list.filter((c) => c.id === r.categoryId)[0],
        account: {
          payFrom: account.list.filter((a) => a.id === r.payFrom)[0],
          payTo: account.list.filter((a) => a.id === r.payTo)[0],
        },
      };
    });
  },
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
