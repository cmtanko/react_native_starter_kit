import styled from 'styled-components/native';

const defaultTextStyle = (theme) => `
    color: ${theme.colors.text.primary};
    flex-wrap: wrap;
    margin-top: 0px;
    margin-bottom: 0px
`;

const heading = (theme) => `
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.h1};
    color: ${theme.colors.text.primary};
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.text.primary}
`;

const subtitle = (theme) => `
    font-size: ${theme.fontSizes.subtitle};
    font-style: italic;
    color:  ${theme.colors.text.disabled};
`;

const error = (theme) => `
    color: ${theme.colors.ui.error};
`;

const hint = (theme) => `
    color: ${theme.colors.ui.gray}
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.caption}
    font-weight: ${theme.fontWeights.regular};
    text-align: center;
`;
// fontSize: 16,
// color: '#10cf9e',
// textAlign: 'right',
//
const typeIncome = (theme) => `
    color: ${theme.colors.ui.success}
    padding-right:  ${theme.space[2]}
    text-align: right
    font-size: ${theme.fontSizes.body}
`;

const typeExpense = (theme) => `
    color: ${theme.colors.ui.error}
    padding-right:  ${theme.space[2]}
    text-align: right
    font-size: ${theme.fontSizes.body}
`;

const typeTransfer = (theme) => `
    color: ${theme.colors.ui.blue}
    padding-right:  ${theme.space[2]}
    text-align: right
    font-size: ${theme.fontSizes.body}
`;
const none = (theme) => `
`;

const variants = {
  heading,
  body,
  subtitle,
  error,
  hint,
  typeIncome,
  typeExpense,
  typeTransfer,
  none,
};

export const Text = styled.Text`
  ${({theme}) => defaultTextStyle(theme)}
  ${({variant, theme}) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: 'body',
};
