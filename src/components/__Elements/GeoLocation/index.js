import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';
import {GOOGLE_API_KEY} from '@env';

import Label from '../Label';
import styles from '../index.styles';
import Geolocation from 'react-native-geolocation-service';
import Button from '../Button';

const GeoLocation = (props) => {
  const {
    testID = 'signaturefield',
    title = '',
    value = [],
    subtitle = '',
    disabled = false,
    required = false,
    onChange,
  } = props;

  const [previousLocation, setPreviousLocation] = useState(value);
  const [location, setLocation] = useState(previousLocation);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (activated) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation([
            position?.coords?.latitude,
            position?.coords?.longitude,
          ]);

          onChange([position?.coords?.latitude, position?.coords?.longitude]);
        },
        (error) => console.warn(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      if (!previousLocation) {
        setLocation([null, null]);
        onChange([null, null]);
      } else {
        setLocation(previousLocation);
        onChange(previousLocation);
      }
    }
  }, [activated, previousLocation]);

  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location[0]},${location[1]}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${location[0]},${location[1]}&key=${GOOGLE_API_KEY}`;

  const showMap = () => {
    if (!disabled) {
      if (location[0]) {
        return (
          <Image
            testID={testID}
            style={styles.geolocation_field}
            source={{
              uri: imagePreviewUrl,
            }}
          />
        );
      } else {
        return (
          <View style={[styles.signature_field_disabled, styles.disabled]}>
            <Text style={styles.disabled}>No map</Text>
          </View>
        );
      }
    } else {
      return (
        <View style={[styles.signature_field_disabled, styles.disabled]}>
          <Text style={styles.disabled}>No map</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <Label title={title} subtitle={subtitle} required={required} />

      <View style={styles.geolocation_header}>
        <View style={styles.geolocation_header_info}>
          <Text style={styles.geolocation_header_text}>
            Lat: {location[0]?.toString().slice(0, 7)}˚
          </Text>
          <Text style={styles.geolocation_header_text}>
            Long: {location[1]?.toString().slice(0, 7)}˚
          </Text>
        </View>
        <View style={styles.geolocation_header_button}>
          <Button
            title={activated ? 'Reset' : 'Get Location'}
            type="primary"
            testID="button"
            disabled={disabled}
            selected={activated}
            toggable={true}
            onChange={() => {
              setPreviousLocation(null);
              setActivated(!activated);
            }}
          />
        </View>
      </View>
      {showMap(location)}
    </SafeAreaView>
  );
};

export default GeoLocation;
