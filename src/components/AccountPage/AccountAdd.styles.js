import styled from 'styled-components/native';
import {Container, Form} from 'native-base';

export const AccountAddContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const AccountForm = styled(Form)`
  margin-left: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
`;
