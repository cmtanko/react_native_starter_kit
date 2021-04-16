import {StyleSheet, Dimensions} from 'react-native';

export const COLOR_WHITE = '#ffffff';
export const COLOR_BLACK = '#202020';

export const COLOR_GRAY_LIGHT = '#e5e5e5';
export const COLOR_GRAY_LIGHT2 = '#c7c7c7';
export const COLOR_GRAY = '#666666';
export const COLOR_GRAY_DARK = '#393939';
export const COLOR_GRAY_DARK2 = '#5b5b5b';

export const COLOR_LIGHT_BLUE = '#22e3c4';
export const COLOR_DARK_BLUE = '#262637';
export const COLOR_DARK_LIGHTBLUE = '#343449';
export const COLOR_LIGHT_YELLOW = '#f5c223';
export const COLOR_RED = '#e7001c';
export const COLOR_LIGHT_RED = '#ff6269';

export const COLOR_LIGHT_GREEN = '#10cf9e';

export default StyleSheet.create({
  // BackgroundColor
  bg_white: {backgroundColor: COLOR_WHITE},
  bg_black: {backgroundColor: COLOR_BLACK},
  bg_dark_blue: {backgroundColor: COLOR_DARK_BLUE},
  bg_dark_lightblue: {backgroundColor: COLOR_DARK_LIGHTBLUE},
  bg_light_green: {backgroundColor: COLOR_LIGHT_GREEN},

  // Color
  color_white: {color: COLOR_WHITE},
  color_black: {color: COLOR_BLACK},
  color_grey: {color: COLOR_GRAY},
  color_light_red: {color: COLOR_LIGHT_RED},
  color_light_blue: {color: COLOR_LIGHT_BLUE},

  // Button
  button: {
    height: 50,
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0,
    elevation: 0,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },

  // Button Text
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR_WHITE,
  },

  // TextError
  errorText: {
    color: 'red',
    padding: 15,
    textAlign: 'center',
  },

  // Image
  image: {
    width: 200,
    height: 200,
    flex: 1,
    alignSelf: 'center',
  },

  // font
  h1: {
    fontSize: 35,
    fontWeight: '700',
  },

  h2: {
    fontSize: 20,
    fontWeight: '700',
  },

  h3: {
    fontSize: 14,
  },

  h4: {
    fontSize: 12,
  },

  center: {
    textAlign: 'center',
  },

  header_block: {
    // flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },

  header_block_right: {
    padding: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#262637',
    width: '36%',
    alignItems: 'center',
  },

  header_block_left: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#2c2c3f',
    width: '36%',
    alignItems: 'center',
  },

  // Icons
  active_icon: {
    fontSize: 35,
    alignSelf: 'center',
    color: '#22e3c4',
  },

  inactive_icon: {
    fontSize: 35,
    alignSelf: 'center',
    color: 'gray',
  },

  // Label
  label: {
    color: COLOR_GRAY,
    paddingLeft: 8,
  },

  // Drawer
  drawer_content: {
    height: 120,
    width: '100%',
    alignSelf: 'stretch',
    position: 'absolute',
  },

  // summary
  summary_header: {
    // flex: 1,
    alignSelf: 'center',
    margin: 20,
  },

  // Timeline
  timeline_description: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#666666',
  },

  timeline_amount_income: {
    fontSize: 16,
    color: '#10cf9e',
    textAlign: 'right',
    paddingRight: 10,
  },

  timeline_amount_expense: {
    fontSize: 16,
    color: '#ff6269',
    textAlign: 'right',
    paddingRight: 10,
  },

  timeline_amount_transfer: {
    fontSize: 16,
    color: '#2196f3',
    textAlign: 'right',
    paddingRight: 10,
  },

  // Card

  card_body: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Fab
  actionButtonIcon: {
    fontSize: 25,
    height: 25,
    color: 'white',
  },

  form: {
    marginLeft: 20,
    marginRight: 20,
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: Dimensions.get('window').width / 5,
  },

  activeIcon: {
    fontSize: 30,
    color: '#22e3c4',
  },

  inactiveIcon: {
    fontSize: 30,
    color: 'gray',
  },

  activeText: {
    fontSize: 11,
    color: '#22e3c4',
  },

  inactiveText: {
    fontSize: 11,
    color: 'gray',
  },

  whiteBorder: {
    borderColor: '#00000000',
  },

  // chart

  chart_block: {
    borderRadius: 10,
    backgroundColor: '#2c2c3f',
    width: '100%',
    alignItems: 'center',
  },

  padding_large: {
    paddingTop: 8,
  },
});
