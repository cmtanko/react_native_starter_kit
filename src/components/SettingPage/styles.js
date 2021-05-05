import styled from 'styled-components/native';
import {Container, View, Text, Button, Icon} from 'native-base';

export const SettingsContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const SettingsTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h3};
  color: ${(props) => props.theme.colors.ui.secondary};
  font-weight: ${(props) => 'bold'};
`;

export const SettingsIcon = styled(Icon)`
  font-size: ${(props) => props.theme.fontSizes.h1};
  color: ${(props) => props.theme.colors.ui.secondary};
`;

export const SettingsContent = styled(View)`
  flex: 1;
  margin-top: 16;
`;

export const SettingsButton = styled(Button)``;

export const SettingsSubTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.subtitle};
  color: ${(props) => props.theme.colors.ui.gray};
  padding-left: 54;
`;
