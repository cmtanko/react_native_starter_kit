import styled from 'styled-components/native';
import {Icon, View} from 'native-base';

export const IconContainer = styled(View)`
  margin-left: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
  justify-content: center;
  height: 50px;
`;

export const ItemIcon = styled(Icon)`
  width: ${(props) => props.theme.sizes[2]};
  color: ${(props) => props.theme.colors.ui.secondary};
`;
