import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

import Label from '../Label';
import styles from '../index.styles';

const Signature = (props) => {
  const {
    testID = 'signaturefield',
    title = '',
    value = '',
    subtitle = '',
    disabled = false,
    required = false,
    onChange,
  } = props;

  return (
    <SafeAreaView>
      <Label title={title} subtitle={subtitle} required={required} />
      {!disabled ? (
        <SignatureCapture
          testID={testID}
          disabled={true}
          style={styles.signatureField}
          backgroundColor="transparent"
          saveImageFileInExtStorage={false}
          showNativeButtons={true}
          showTitleLabel={false}
          showBorder={false}
          minStrokeWidth={4}
          maxStrokeWidth={4}
          viewMode={'portrait'}
          onSaveEvent={(a) => {
            onChange(a);
          }}
          onDragEvent={(a) => {
            console.warn(a);
          }}
        />
      ) : (
        <View style={[styles.signature_field_disabled, styles.disabled]}>
          <Text style={styles.disabled}>Unable to sign</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Signature;
