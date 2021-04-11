import styled from 'styled-components/native';
import {Container, Fab} from 'native-base';

export const CategoryPageContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const CategoryPageFab = styled(Fab)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
`;
