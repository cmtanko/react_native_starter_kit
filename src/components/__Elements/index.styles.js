import {StyleSheet, Platform, Dimensions} from 'react-native';

import {theme} from './theme';

console.warn(theme.space);

export default StyleSheet.create({
  disabled: {
    color: theme.colors.text.disabled,
    borderColor: theme.colors.ui.disabled,
    backgroundColor: theme.colors.ui.disabled,
  },

  title_container: {
    flex: 1,
    flexDirection: 'row',
  },

  required: {
    marginTop: -8,
    height: theme.sizes[3],
    color: theme.colors.text.error,
    fontSize: theme.fontSizes.h0,
    fontWeight: theme.fontWeights.medium,
  },

  text_field_title: {
    flex: 1,
    height: theme.sizes[3],
    color: theme.colors.text.primary,
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.space[2],
  },

  text_field_subtitle: {
    flex: 1,
    color: theme.colors.text.primary,
    fontSize: theme.fontSizes.subtitle,
    marginBottom: theme.space[1],
  },

  text_field: {
    flex: 1,
    color: theme.colors.text.primary,
    height: 54,
    fontSize: theme.fontSizes.body,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.ui.primary,
    paddingLeft: theme.space[2],
    borderRadius: 4,
    paddingRight: theme.space[2],
    marginBottom: theme.space[3],
  },

  text_area: {
    flex: 1,
    color: theme.colors.text.primary,
    height: 142,
    fontSize: theme.fontSizes.body,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.ui.primary,
    paddingLeft: theme.space[2],
    borderRadius: 4,
    paddingRight: theme.space[2],
    marginBottom: theme.space[3],
  },

  date_picker: {
    flex: 1,
    width: '100%',
    color: theme.colors.text.primary,
    height: 54,
    fontSize: theme.fontSizes.body,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.ui.primary,
    borderRadius: 4,
    marginBottom: theme.space[3],
  },

  dateInput: {
    height: 54,
    borderWidth: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: theme.space[3],
    paddingLeft: theme.space[2],
    paddingRight: theme.space[2],
  },

  dateText: {
    fontSize: theme.fontSizes.body,
  },

  dateIcon: {
    position: 'absolute',
    right: 0,
    top: 8,
  },

  clear: {
    right: 64,
    top: -52,
    color: theme.colors.text.disabled,
    position: 'absolute',
    fontSize: theme.fontSizes.subtitle,
    fontWeight: theme.fontWeights.medium,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },

  button: {
    width: '100%',
    height: 54,
    borderRadius: 4,
    marginBottom: theme.space[3],
  },

  buton_none: {
    backgroundColor: theme.colors.ui.tertiary,
  },

  button_primary: {
    backgroundColor: theme.colors.ui.primary,
  },

  button_danger: {
    backgroundColor: theme.colors.ui.error,
  },

  selected: {
    backgroundColor: theme.colors.ui.secondary,
  },

  fullWidth: {
    width: '100%',
  },

  list: {
    marginLeft: -16,
  },

  listItem: {
    height: 68,
    width: '100%',
  },

  dropdown: {
    width: '100%',
    height: 54,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.ui.primary,
    paddingLeft: -8,
    borderRadius: 4,
    paddingRight: theme.space[2],
    marginBottom: theme.space[3],
  },

  signatureField: {
    flex: 1,
    width: '100%',
    height: 200,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.ui.primary,
    marginBottom: theme.space[3],
  },

  signature_field_disabled: {
    flex: 1,
    width: '100%',
    height: 200,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.ui.primary,
    marginBottom: theme.space[3],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
