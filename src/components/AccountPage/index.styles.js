import {View} from 'react-native';
import styled from 'styled-components/native';
import {Container, Fab, Form, Icon, Card, CardItem, Body} from 'native-base';

export const AccountPageContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const AccountPageContent = styled(View)`
  flex: 1;
`;

export const AccountPageFab = styled(Fab)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
`;

export const AccountAddContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const AccountForm = styled(Form)`
  margin-left: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
`;

export const AccountIcon = styled(Icon)`
  font-size: ${(props) => props.theme.fontSizes.h1};
  color: ${(props) => props.theme.colors.ui.secondary};
`;

export const AccountSummaryContent = styled(View)`
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const SummaryCard = styled(Card)``;

export const SummaryCardItem = styled(CardItem)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const SummaryBody = styled(Body)`
  align-items: center;
  justify-content: center;
`;
