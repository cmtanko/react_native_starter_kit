import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {addBackup, resetDatabase, addAccounts} from '../../actions';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

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
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then((writeGranted) => {
      console.log('writeGranted', writeGranted);
      if (!writeGranted) {
        requestWriteStoragePermission();
      }
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then((readGranted) => {
        console.log('readGranted', readGranted);
        if (!readGranted) {
          requestReadStoragePermission();
        }
      });
    });
  };

  initialGoogle = async () => {
    try {
      await GoogleSignin.configure({
        scopes: GOOGLE_API_SCOPES,
        iosClientId: GOOGLE_API_IOS_CLIENT_ID,
      });
      // const user = await GoogleSignin.signIn();

      const {accessToken} = await GoogleSignin.getTokens();
      setApiToken(accessToken);
    } catch (error) {
      await GoogleSignin.signIn();

      const {accessToken} = await GoogleSignin.getTokens();
      setApiToken(accessToken);
    }
  };

  uploadToGoogleDrive = async () => {
    await this.initialGoogle();

    getFile()
      .then((fileFromGDrive) => {
        fileFromGDrive ? upload(fileFromGDrive.id) : upload(false);
        alert('Database exported successfully');
      })
      .catch((error) => {
        alert('Error exporting database ' + error);
      });
  };

  getDataFromGoogleDrive = async () => {
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
        alert('Error exporting database ' + error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.buttonGetData}
          onPress={this.getDataFromGoogleDrive}>
          <Text style={styles.text}>Import Database</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonGetData}
          onPress={this.uploadToGoogleDrive}>
          <Text style={styles.text}>Export Database</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 10,
  },
  textData: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  buttonGetData: {
    backgroundColor: '#333',
    padding: 10,
    margin: 10,
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  resetDatabase,
})(SocialSigninPage);
