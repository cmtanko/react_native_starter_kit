import styled from 'styled-components/native';
import {Icon} from 'native-base';

export const CategoryIcon = styled(Icon)`
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.ui.secondary};
`;
