import styled from 'styled-components/native';
import {Card, CardItem, Content, Body} from 'native-base';

export const AccountSummaryContent = styled(Content)`
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
