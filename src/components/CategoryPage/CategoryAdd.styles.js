import styled from 'styled-components/native';
import {Container, Form} from 'native-base';

export const CategoryAddContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const CategoryForm = styled(Form)`
  margin-left: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
`;
