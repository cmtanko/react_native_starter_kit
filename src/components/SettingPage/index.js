/* eslint-disable dot-notation */
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';

import {readFromFile, writetoFile} from '../../utils/fileManager';
import {addBackup, resetDatabase, addAccounts} from '../../actions';

const sampelData = require('../../assets/sampledata/personal_expense_manager.json');
import {
  SettingsContainer,
  SettingsContent,
  SettingsButton,
  SettingsTitle,
  SettingsIcon,
  SettingsSubTitle,
} from './styles';

const SettingPage = (props) => {
  const {latestBackup} = props;

  const importDatabase = () => {
    readFromFile()
      .then((result) => {
        let accountSqlQuery = getAccountSqlQuery(result);
        let categorySqlQuery = getCategorySqlQuery(result);
        let recordSqlQuery = getRecordSqlQuery(result);

        props.resetDatabase(
          accountSqlQuery,
          categorySqlQuery,
          recordSqlQuery,
          () => {
            alert('Database Imported Successfully');
          },
        );
      })
      .catch((error) => {
        console.warn('erroror==>');
        alert(error);
      });
  };

  const exportDatabase = () => {
    const {records, accounts, categories} = props;

    const allRecordDataForExport = records.map((record) => {
      const category = categories.find((cat) => cat.id === record.categoryId);

      const accountFrom = accounts.find((acc) => acc.id === record.payFrom);

      const accountTo = accounts.find((acc) => acc.id === record.payTo);

      return {
        id: record.id,
        date: record.date,
        description: record.description,
        amount: record.amount,
        place: record.place,
        camera: record.camera,

        categoryId: category.id,
        categoryTitle: category.title,
        categoryIcon: category.icon,
        categoryType: category.type,

        payFromId: (accountFrom && accountFrom.id) || null,
        payFromTitle: (accountFrom && accountFrom.title) || '',
        payFromIcon: (accountFrom && accountFrom.icon) || '',
        payFromType: (accountFrom && accountFrom.type) || '',
        payFromOpeningBalance: (accountFrom && accountFrom.openingBalance) || 0,

        payToId: (accountTo && accountTo.id) || null,
        payToTitle: (accountTo && accountTo.title) || '',
        payToIcon: (accountTo && accountTo.icon) || '',
        payToType: (accountTo && accountTo.type) || '',
        payToOpeningBalance: (accountTo && accountTo.openingBalance) || 0,
      };
    });

    writetoFile(allRecordDataForExport)
      .then(() => {
        props.addBackup({
          title: 'personal_expense_manager.csv',
          date: new Date().toISOString(),
          callback: function () {
            alert('Database Exported Successfully');
          },
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const loadSampleData = () => {
    try {
      let accountSqlQuery = getAccountSqlQuery(sampelData);
      let categorySqlQuery = getCategorySqlQuery(sampelData);
      let recordSqlQuery = getRecordSqlQuery(sampelData);

      props.resetDatabase(
        accountSqlQuery,
        categorySqlQuery,
        recordSqlQuery,
        () => {
          alert('Database Imported Successfully');
        },
      );
    } catch (error) {
      alert(error);
    }
  };

  const getAccountSqlQuery = (result) => {
    const accountsFromCsv = result.map((res) => {
      return {
        id: res['PayFromId'] ? res['PayFromId'] : res['PayToId'],
        title: res['PayFromId'] ? res['PayFromTitle'] : res['PayToTitle'],
        type: res['PayFromId'] ? res['PayFromType'] : res['PayToType'],
        openingBalance: res['PayFromId']
          ? res['PayFromOpeningBalance']
          : res['PayToOpeningBalance'],
        icon: res['PayFromId'] ? res['PayFromIcon'] : res['PayToIcon'],
      };
    });

    let accounts = [];
    let accountSqlQuery = '';

    accountsFromCsv.forEach((account) => {
      let isAccountIdAlreadyPresent = accounts.find((a) => a.id === account.id);
      if (!isAccountIdAlreadyPresent && account.id) {
        accountSqlQuery += `(${account.id},'${account.title}','${account.type}',${account.openingBalance},'${account.icon}'),`;
        accounts.push(account);
      }
    });
    return accountSqlQuery.slice(0, accountSqlQuery.length - 1);
  };

  const getCategorySqlQuery = (result) => {
    const categoriesFromCsv = result.map((res) => {
      return {
        id: res['CategoryId'],
        title: res['CategoryTitle'],
        type: res['CategoryType'],
        icon: res['CategoryIcon'],
      };
    });

    let categories = [];
    let categoriesSqlQuery = '';

    categoriesFromCsv.forEach((category) => {
      let isCatagodyIdAlreadyPresent = categories.find(
        (a) => a.id === category.id,
      );
      if (!isCatagodyIdAlreadyPresent && category.id) {
        categoriesSqlQuery += `(${category.id},'${category.title}','${category.type}','${category.icon}'),`;
        categories.push(category);
      }
    });
    return categoriesSqlQuery.slice(0, categoriesSqlQuery.length - 1);
  };

  const getRecordSqlQuery = (result) => {
    const recordsFromCsv = result.map((res) => {
      return {
        id: res['RecordId'],
        amount: res['Amount'],
        date: res['Date'],
        categoryId: res['CategoryId'],
        payFrom: res['PayFromId'],
        payTo: res['PayToId'],
        description: res['Description'],
        place: res['Place'],
        camera: res['Camera'],
      };
    });

    let records = [];
    let recordsSqlQuery = '';

    recordsFromCsv.forEach((record) => {
      let isCatagodyIdAlreadyPresent = records.find((a) => a.id === record.id);
      if (!isCatagodyIdAlreadyPresent && record.id) {
        recordsSqlQuery += `(${record.id},'${record.amount}','${record.date}',${record.categoryId},${record.payFrom},${record.payTo}, '${record.description}','${record.place}', '${record.camera}'),`;
        records.push(record);
      }
    });
    return recordsSqlQuery.slice(0, recordsSqlQuery.length - 1);
  };

  return (
    <SettingsContainer>
      <SettingsContent>
        <SettingsButton iconLeft transparent onPress={() => loadSampleData()}>
          <SettingsIcon name="download" />
          <SettingsTitle>Load Sample Data</SettingsTitle>
        </SettingsButton>

        <SettingsButton iconLeft transparent onPress={() => importDatabase()}>
          <SettingsIcon name="md-cloud-download-sharp" />
          <SettingsTitle>Import Database</SettingsTitle>
        </SettingsButton>

        <SettingsButton
          iconLeft
          transparent
          onPress={() => exportDatabase(props)}>
          <SettingsIcon name="md-cloud-upload-sharp" />
          <SettingsTitle>Export Database</SettingsTitle>
        </SettingsButton>
        <SettingsSubTitle>
          Last exported at:{' '}
          {latestBackup && new Date(latestBackup.date).toDateString()}
        </SettingsSubTitle>
      </SettingsContent>
    </SettingsContainer>
  );
};

const mapStateToProps = (state) => {
  const {
    record: {list: recordList},
    account: {list: accountList},
    category: {list: categoryList},
    backup: {list: backupList},
  } = state;

  const records = _.map(recordList, (val, id) => {
    return val;
  });

  const accounts = _.map(accountList, (val, id) => {
    return val;
  });

  const categories = _.map(categoryList, (val, id) => {
    return val;
  });

  const latestBackup = backupList[backupList.length - 1];
  return {records, accounts, categories, latestBackup};
};

export default connect(mapStateToProps, {
  addBackup,
  resetDatabase,
  addAccounts,
})(SettingPage);
