import styled from 'styled-components/native';
import {Segment, Fab} from 'native-base';

export const SegmentContainer = styled(Segment)`
  margin-top: 10px;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const AccountPageFab = styled(Fab)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
`;
