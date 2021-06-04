import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Icon, InputGroup, Item, Label, Input, Picker} from 'native-base';

const {width: WIDTH} = Dimensions.get('window');

console.warn(WIDTH);

export const InputGroupContainer = styled(InputGroup)`
  border-bottom-width: 0;
`;

export const IconContainer = styled(Icon)`
  font-size: ${(props) => props.theme.fontSizes.h1};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  width: ${(props) => props.theme.sizes[2]};
  color: ${(props) => props.theme.colors.ui.secondary};
`;

export const ItemContainer = styled(Item)`
  width: 100%;
  border-bottom-width: 0;
  align-items: flex-start;
`;

export const LabelContainer = styled(Label)`
  color: ${(props) => props.theme.colors.text.disabled};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const InputContainer = styled(Input)`
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 92%;
  border-radius: 2;
  height: 8;
`;

export const PickerContainer = styled(Picker)`
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 2;
  width: ${WIDTH * 0.82};
`;
