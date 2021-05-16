import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {GoogleSignin} from '@react-native-community/google-signin';

import {
  addBackup,
  getBackup,
  addUserInfo,
  addAccounts,
  getRecords,
  getAccounts,
  getUserInfo,
  getCategories,
  resetDatabase,
} from '../../actions';
import {writetoFile} from '../../utils/fileManager';
import {
  selectRecords,
  selectCategories,
  selectAccounts,
  selectBackups,
} from '../../selector';

import {
  upload,
  getFile,
  download,
  setApiToken,
  requestReadStoragePermission,
  requestWriteStoragePermission,
  GOOGLE_API_SCOPES,
  GOOGLE_API_IOS_CLIENT_ID,
} from '../../utils/cloudFileManager';
import {Platform} from 'react-native';

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

      const user = await GoogleSignin.signIn();
      this.props.addUserInfo(
        user.user.name,
        user.user.email,
        user.user.photo,
        user.idToken,
        () => {},
      );
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
                this.props.getRecords();
                this.props.getAccounts();
                this.props.getCategories();
                this.props.getBackup();
                this.props.getUserInfo();
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

    const doesAppNeedsToImportDatabase = records && records.length === 0;

    if (doesAppNeedsToImportDatabase) {
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
        alert('Error => ' + JSON.stringify(error));
      });
  };

  render() {
    const {latestBackup} = this.props;
    const lastBackupDate =
      latestBackup && new Date(latestBackup.date).toDateString();
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.buttonGetData}
          onPress={this.syncDatabase}>
          <Text style={styles.text}>Sync</Text>
        </TouchableHighlight>
        <Text style={{paddingLeft: 8}}>Last synced at: {lastBackupDate}</Text>
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
  return {
    records: selectRecords(state),
    accounts: selectAccounts(state),
    categories: selectCategories(state),
    latestBackup: selectBackups(state),
  };
};

export default connect(mapStateToProps, {
  addBackup,
  getBackup,
  getRecords,
  addUserInfo,
  addAccounts,
  getUserInfo,
  getAccounts,
  resetDatabase,
  getCategories,
})(SocialSigninPage);
