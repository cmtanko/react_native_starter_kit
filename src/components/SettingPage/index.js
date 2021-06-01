/* eslint-disable react-native/no-inline-styles */
/* eslint-disable dot-notation */
import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Left,
  Body,
  Icon,
  Right,
  Title,
  Header,
  Button,
  Content,
  Thumbnail,
} from 'native-base';

import {ListButtonBox} from '../Common';
import GoogleSignInComponent from '../SocialSigninPage';
import {
  addBackup,
  resetDatabase,
  wipeDatabase,
  addAccounts,
  getSettings,
  setSettings,
} from '../../actions';

import {
  selectRecords,
  selectCategories,
  selectAccounts,
  selectUser,
  selectBackups,
  selectSetting,
} from '../../selector';

const sampelData = require('../../assets/sampledata/personal_expense_manager.json');

import {SettingsContainer, ProfileTitle, ProfileSubTitle} from './styles';
import styles from './styles';

const SettingPage = (props) => {
  const {latestBackup} = props;

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

  const emptyDatabase = () => {
    try {
      props.wipeDatabase(() => {
        alert('Database wiped successfully');
      });
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

  const displayProfile = () => {
    if (props.userInfo) {
      return (
        <View>
          <Thumbnail
            source={{uri: props.userInfo && props.userInfo.displaypicture}}
            style={styles.profile.avatar}
          />
          <ProfileTitle>{props.userInfo.fullname}</ProfileTitle>
          <ProfileSubTitle>{props.userInfo.email}</ProfileSubTitle>
        </View>
      );
    }
  };

  return (
    <SettingsContainer>
      <View style={{height: 220, backgroundColor: '#0E131B'}}>
        <Header transparent>
          <Left>
            <Button transparent onPress={() => props.navigation.openDrawer()}>
              <Icon name="menu" style={{color: 'white'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white', fontSize: 30, alignItems: 'center'}}>
              Profile
            </Title>
          </Body>
          <Right />
        </Header>
      </View>

      <View style={{flex: 1, backgroundColor: 'white'}}>
        {displayProfile()}
        <Content>
          <ListButtonBox
            title="Security"
            icon="lock-open"
            type="switch"
            isSelected={props.settings.lockscreen === 'true'}
            onChange={(val) => {
              props.setSettings({
                ...props.settings,
                lockscreen: val.toString(),
              });
            }}
          />
          <ListButtonBox
            title="Notification"
            icon="airplane"
            type="switch"
            isSelected={props.settings.notification === 'true'}
            onChange={(val) => {
              props.setSettings({
                ...props.settings,
                notification: val.toString(),
              });
            }}
          />
          <ListButtonBox
            title="Currency"
            icon="md-basket"
            type="list"
            selectedItem={props.settings.currency}
          />
          <ListButtonBox
            title="Load sample data"
            icon="md-basket"
            type="button"
            onPress={loadSampleData}
          />
          <ListButtonBox
            title="Wipe all data"
            icon="md-trash"
            type="button"
            onPress={emptyDatabase}
          />

          <GoogleSignInComponent
            title={
              latestBackup &&
              latestBackup.date &&
              new Date(latestBackup.date).toDateString()
            }
          />
        </Content>
      </View>
    </SettingsContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    records: selectRecords(state),
    accounts: selectAccounts(state),
    categories: selectCategories(state),
    latestBackup: selectBackups(state),
    userInfo: selectUser(state),
    settings: selectSetting(state),
  };
};

export default connect(mapStateToProps, {
  addBackup,
  wipeDatabase,
  resetDatabase,
  addAccounts,
  getSettings,
  setSettings,
})(SettingPage);
