import styled from 'styled-components/native';
import {Dimensions, StyleSheet} from 'react-native';
import {Icon, InputGroup, Item, Label, Input, Picker} from 'native-base';

const {width: WIDTH} = Dimensions.get('window');

console.warn(WIDTH);

export const InputGroupContainer = styled(InputGroup)`
  border-bottom-width: 0;
  padding-bottom: ${(props) => props.theme.space[0]};
`;

export const IconContainer = styled(Icon)`
  font-size: ${(props) => props.theme.fontSizes.h1};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  width: ${(props) => props.theme.sizes[2]};
  color: ${(props) => props.theme.colors.ui.secondary};
  padding-top: 16;
`;

export const ItemContainer = styled(Item)`
  width: 100%;
  border-bottom-width: 0;
  align-items: flex-start;
`;

export const LabelContainer = styled(Label)`
  color: ${(props) => props.theme.colors.text.disabled};
  padding-bottom: ${(props) => props.theme.space[1]};
`;

export const InputContainer = styled(Input)`
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 92%;
  height: ${(props) => props.theme.sizes[3]};
  border-radius: 2;
  padding-left: 16;
`;

export const PickerContainer = styled(Picker)`
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.bg.primary};
  border-radius: 2;
  width: ${WIDTH * 0.82};
  height: ${(props) => 42};
`;

export const IconModalBoxStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
