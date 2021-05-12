import styled from 'styled-components/native';
import {Container, View, Text, Button, Icon} from 'native-base';

export const SettingsContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const SettingsTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h3};
  color: ${(props) => props.theme.colors.ui.white};
  font-weight: ${(props) => 'bold'};
`;

export const SettingsIcon = styled(Icon)`
  font-size: ${(props) => props.theme.fontSizes.h1};
  color: ${(props) => props.theme.colors.ui.white};
`;

export const SettingsContent = styled(View)`
  flex: 1;
  margin-top: 16;
`;

export const SettingsButton = styled(Button)`
  height: 50;
  elevation: 0;
  margin-left: 30;
  margin-right: 30;
  margin-top: 20;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const SettingsSubTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.subtitle};
  color: ${(props) => props.theme.colors.ui.gray};
  padding-left: 54;
`;

export const ProfileTitle = styled(Text)`
  align-self: center;
  font-size: ${(props) => props.theme.fontSizes.h0};
  color: ${(props) => props.theme.colors.bg.primary};
`;

export const ProfileSubTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.bg.primary};
  align-self: center;
`;

export const MyButton = styled(Button)`
  color: red;
  background-color: red;
`;

export default {
  profile: {
    container: {
      alignSelf: 'center',
      paddingTop: 10,
      marginBottom: 15,
      marginTop: 10,
    },
    avatar: {
      alignSelf: 'center',
      marginTop: -80,
      width: 160,
      height: 160,
      borderRadius: 100,
      borderColor: 'white',
      borderWidth: 4,
    },
  },
};
