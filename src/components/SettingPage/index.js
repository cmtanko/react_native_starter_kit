/* eslint-disable dot-notation */
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {addBackup, resetDatabase, addAccounts} from '../../actions';

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
    const pathToRead = `${RNFetchBlob.fs.dirs.DownloadDir}/personal_expense_manager.csv`;
    readFromFile(pathToRead);
  };

  const exportDatabase = (props) => {
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

        payFromId: accountFrom.id,
        payFromTitle: accountFrom.title,
        payFromIcon: accountFrom.icon,
        payFromType: accountFrom.type,
        payFromOpeningBalance: accountFrom.openingBalance,

        payToId: accountTo.id,
        payToTitle: accountTo.title,
        payToIcon: accountTo.icon,
        payToType: accountTo.type,
        payToOpeningBalance: accountTo.openingBalance,
      };
    });

    // construct csvString
    const headerString =
      'RecordId, Date, Description, Amount, Place, Camera, CategoryId, CategoryTitle, CategoryIcon, CategoryType, PayFromId, PayFromTitle, PayFromIcon, PayFromType, PayFromOpeningBalance,  PayToId, PayToTitle, PayToIcon, PayToType, PayToOpeningBalance,  \n';
    const rowString = allRecordDataForExport
      .map(
        (r) =>
          `${r.id},${r.date},${r.description},${r.amount},${r.place},${r.camera},${r.categoryId},${r.categoryTitle},${r.categoryIcon},${r.categoryType},${r.payFromId},${r.payFromTitle},${r.payFromIcon},${r.payFromType},${r.payFromOpeningBalance},${r.payToId},${r.payToTitle},${r.payToIcon},${r.payToType},${r.payToOpeningBalance},\n`,
      )
      .join('');
    const csvString = `${headerString}${rowString}`;

    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/personal_expense_manager.csv`;
    console.log('pathToWrite', pathToWrite);
    writetoFile(pathToWrite, csvString);
  };

  const writetoFile = (pathToWrite, csvString) => {
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        console.log(`wrote file ${pathToWrite}`);
        props.addBackup({
          title: 'personal_expense_manager.csv',
          date: new Date().toISOString(),
          callback: function () {
            console.warn('1');
          },
        });
      })
      .catch((error) => console.error(error));
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

  const readFromFile = (pathToRead) => {
    RNFetchBlob.fs
      .readFile(pathToRead, 'utf8')
      .then((file) => {
        try {
          console.log(`read from file ${pathToRead}`);
          let lines = file.split('\n');

          let result = [];

          let headers = lines[0].split(',');

          for (let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
              if (headers[j].trim() && currentline[0]) {
                obj[headers[j].trim()] = currentline[j];
              }
            }
            result.push(obj);
          }

          console.warn(result);

          let finalValue = getAccountSqlQuery(result);
          let categorySqlQuery = getCategorySqlQuery(result);
          let recordSqlQuery = getRecordSqlQuery(result);
          console.warn(finalValue);
          console.warn(categorySqlQuery);
          console.warn(recordSqlQuery);

          props.resetDatabase(finalValue, categorySqlQuery);

          //return result; //JavaScript object
          return JSON.stringify(result); //JSON
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <SettingsContainer>
      <SettingsContent>
        <SettingsButton iconLeft transparent onPress={() => importDatabase()}>
          <SettingsIcon name="md-cloud-download-sharp" />
          <SettingsTitle>Import Database</SettingsTitle>
        </SettingsButton>
        <SettingsSubTitle>Last exported at: </SettingsSubTitle>

        <SettingsButton
          iconLeft
          transparent
          onPress={() => exportDatabase(props)}>
          <SettingsIcon name="md-cloud-upload-sharp" />
          <SettingsTitle>Export Database</SettingsTitle>
        </SettingsButton>
        <SettingsSubTitle>
          Last exported at:
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
