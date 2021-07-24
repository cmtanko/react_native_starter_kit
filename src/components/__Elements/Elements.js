import React, {useState} from 'react';
import {
  Container,
  Header,
  View,
  Content,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';

import {
  Button,
  TextArea,
  TextField,
  CheckBox,
  Dropdown,
  Signature,
  DatePicker,
  TimePicker,
  RadioButton,
  GeoLocation,
} from './index';

import cs from '../../styles/common';

const ElementsPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [text, setText] = useState('');
  const [textArea, setTextArea] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <Container>
      <Content>
        <View style={{padding: 10}}>
          <Text style={[cs.h1]}>Elements</Text>
          <GeoLocation
            testID="geolocationField"
            title="Geo Location"
            subtitle="Your address"
            placeholder="Location"
            value={[null, null]}
            disabled={disabled}
            required={required}
            onChange={(value) => {
              console.warn(JSON.stringify(value));
            }}
          />
          <Signature
            testID="textField"
            title="Signature"
            subtitle="Your signature please"
            placeholder="Sign Here"
            value={text}
            disabled={disabled}
            required={required}
            onChange={(value) => {
              setText(value);
            }}
          />
          <TextField
            testID="textField"
            title="Title"
            subtitle="sub titlesub titlesub titlesub titlesub titlesub titlesub \n titlesub titlesub titlesub titlesub titlesub titlesub /n titlesub titlesub titlesub title"
            placeholder="Your text goes here"
            value={text}
            numeric={false}
            returnKeyType="done"
            focus
            disabled={disabled}
            required={required}
            onChange={(value) => {
              setText(value);
            }}
          />

          <TextArea
            testID="textArea"
            title="Title"
            subtitle=""
            placeholder="Your text gdoes here"
            value={textArea}
            numeric={false}
            returnKeyType="done"
            focus
            disabled={disabled}
            required={required}
            onChange={(value) => {
              setTextArea(value);
            }}
          />

          <DatePicker
            testID="datePicker"
            title="Date"
            subtitle=""
            placeholder="Select Date"
            value={date}
            disabled={disabled}
            required={required}
            onChange={(value) => {
              setDate(value);
            }}
            onClear={() => {
              setDate('');
            }}
          />

          <TimePicker
            testID="datePicker"
            title="Time"
            subtitle="Select Time"
            placeholder="Select time"
            value={time}
            disabled={disabled}
            required={required}
            onChange={(value) => {
              setTime(value);
            }}
            onClear={() => {
              setTime('');
            }}
          />

          <RadioButton
            testID="radiobutton"
            title="Radio Button"
            subtitle="Select 1 from the list"
            placeholder="Select item"
            value={date}
            disabled={disabled}
            required={required}
            onChange={(value) => {
              setDate(value);
            }}
            onClear={() => {
              setDate('');
            }}
          />

          <CheckBox
            testID="checkbox"
            title="Checkbox"
            subtitle="Select 1 from the list"
            placeholder="Select item"
            value={date}
            disabled={disabled}
            required={required}
            onChange={(value) => {
              setDate(value);
            }}
            onClear={() => {
              setDate('');
            }}
          />

          <Dropdown
            testID="textField"
            title="Dropdown"
            subtitle=""
            placeholder="Select 1"
            value={text}
            numeric={false}
            returnKeyType="done"
            focus
            disabled={disabled}
            required={required}
            onChange={(value) => {
              setText(value);
            }}
          />

          <Button
            testID="button"
            title="Click Here"
            type="primary"
            toggable={false}
            selected={false}
            disabled={disabled}
            onChange={() => {}}
          />

          <Button
            testID="button"
            title="Click Here"
            type="none"
            toggable={true}
            selected={true}
            disabled={disabled}
            onChange={() => {}}
          />
        </View>

        <ListItem>
          <Body>
            <Text>Disabled</Text>
          </Body>
          <Right>
            <Switch
              value={disabled}
              onChange={() => {
                setDisabled(!disabled);
              }}
            />
          </Right>
        </ListItem>

        <ListItem>
          <Body>
            <Text>Required</Text>
          </Body>
          <Right>
            <Switch
              value={required}
              onChange={() => {
                setRequired(!required);
              }}
            />
          </Right>
        </ListItem>
      </Content>
    </Container>
  );
};

export default ElementsPage;
