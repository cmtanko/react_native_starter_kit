import styled from 'styled-components/native';
import {Container, Fab, Form, Icon} from 'native-base';

export const CategoryPageContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const CategoryPageFab = styled(Fab)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
`;

export const CategoryAddContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const CategoryForm = styled(Form)`
  margin-left: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
`;

export const CategoryIcon = styled(Icon)`
  font-size: ${(props) => props.theme.fontSizes.h1};
  color: ${(props) => props.theme.colors.ui.secondary};
`;
