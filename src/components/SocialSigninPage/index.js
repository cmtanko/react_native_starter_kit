import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {
  addBackup,
  resetDatabase,
  addAccounts,
  addUserInfo,
} from '../../actions';
import {readFromFile, writetoFile} from '../../utils/fileManager';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import {
  upload,
  getFile,
  download,
  setApiToken,
  requestWriteStoragePermission,
  requestReadStoragePermission,
  GOOGLE_API_SCOPES,
  GOOGLE_API_IOS_CLIENT_ID,
} from '../../utils/cloudFileManager';
import {Platform} from 'react-native';

let apiToken = null;

class SocialSigninPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };

    this.checkPermission();
  }

  checkPermission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then((writeGranted) => {
        if (!writeGranted) {
          requestWriteStoragePermission();
        }
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then((readGranted) => {
          if (!readGranted) {
            requestReadStoragePermission();
          }
        });
      });
    }
  };

  initialGoogle = async () => {
    try {
      const {userInfo} = this.props || null;

      await GoogleSignin.configure({
        scopes: GOOGLE_API_SCOPES,
        iosClientId: GOOGLE_API_IOS_CLIENT_ID,
      });

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      if (!userInfo) {
        const user = await GoogleSignin.signIn();
        this.props.addUserInfo(
          user.user.name,
          user.user.email,
          user.user.photo,
          user.idToken,
          () => {},
        );
      }
      const {accessToken} = await GoogleSignin.getTokens();
      setApiToken(accessToken);
    } catch (error) {
      alert('Unable to sync with the server');
    }
  };

  importDatabase = async () => {
    await this.initialGoogle();
    getFile()
      .then((fileFromGDrive) => {
        if (fileFromGDrive) {
          download(fileFromGDrive.id).then((res) => {
            const {accountSqlQuery, categorySqlQuery, recordSqlQuery} = res;

            this.props.resetDatabase(
              accountSqlQuery,
              categorySqlQuery,
              recordSqlQuery,
              () => {
                alert('Database Imported Successfully');
              },
            );
          });
        }
      })
      .catch((error) => {
        alert('Error importing database ' + error);
      });
  };

  syncDatabase = async () => {
    // Only download if no records present in the db
    const {records} = this.props;

    if (records && records.length === 0) {
      this.importDatabase();
    } else {
      this.exportDatabase();
    }
  };

  exportDatabase = () => {
    const {records, accounts, categories} = this.props;

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
        let that = this;
        this.props.addBackup({
          title: 'personal_expense_manager.csv',
          date: new Date().toISOString(),
          callback: async function () {
            await that.initialGoogle();

            getFile()
              .then((fileFromGDrive) => {
                fileFromGDrive ? upload(fileFromGDrive.id) : upload(false);
                alert('Database exported successfully');
              })
              .catch((error) => {
                alert('Error exporting database ' + error);
              });
          },
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.buttonGetData}
          onPress={this.syncDatabase}>
          <Text style={styles.text}>Sync</Text>
        </TouchableHighlight>
        <Text style={{paddingLeft: 8}}>Last synced at: {this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 10,
    fontWeight: 'bold',
  },
  buttonGetData: {
    backgroundColor: '#262637',
    padding: 10,
    margin: 10,
  },
});

const mapStateToProps = (state) => {
  const {
    record: {list: recordList},
    account: {list: accountList},
    category: {list: categoryList},
    backup: {list: backupList},
    user: {list: userList},
  } = state;

  const records = recordList.map((val, id) => {
    return val;
  });

  const accounts = accountList.map((val, id) => {
    return val;
  });

  const categories = categoryList.map((val, id) => {
    return val;
  });

  const latestBackup = backupList[backupList.length - 1];

  const userInfo = userList;
  return {records, userInfo, accounts, categories, latestBackup};
};

export default connect(mapStateToProps, {
  addBackup,
  addUserInfo,
  addAccounts,
  resetDatabase,
})(SocialSigninPage);
