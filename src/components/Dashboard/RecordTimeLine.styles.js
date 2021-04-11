import styled from 'styled-components/native';
import {Container, Fab} from 'native-base';

export const AccountPageContainer = styled(Container)`
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const AccountPageFab = styled(Fab)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
`;
