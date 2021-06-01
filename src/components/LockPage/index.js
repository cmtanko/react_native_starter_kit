import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import PINCode, {hasUserSetPinCode} from '@haskkor/react-native-pincode';

import {setLockedState} from '../../actions';
import {selectBackups, selectSetting} from '../../selector';
import cs, {COLOR_SECONDARY} from '../../styles/common';

const LockPage = (props) => {
  const [status, setStatus] = useState('choose');

  useEffect(() => {
    hasUserSetPinCode().then((val) => {
      setStatus(val ? 'enter' : 'choose');
    });
  }, []);

  return (
    <View style={cs.container}>
      <PINCode
        touchIDDisabled={true}
        status={status}
        maxAttempts="100"
        colorCircleButtons={COLOR_SECONDARY}
        subtitleChoose={'To secure Personal Expense Manager'}
        finishProcess={(a) => {
          console.warn(a);
          props.setLockedState(false);
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    latestBackup: selectBackups(state),
    setting: selectSetting(state),
  };
};

export default connect(mapStateToProps, {
  setLockedState,
})(LockPage);
