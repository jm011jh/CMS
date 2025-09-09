export type ThemeColors = {
  white: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  black: string;
  fontGray: string;
  primary: {
    lighten100: string;
    lighten200: string;
    lighten300: string;
    lighten400: string;
    primary: string;
    darken100: string;
    darken200: string;
    darken300: string;
    darken400: string;
  };
  sub: {
    lighten100: string;
    lighten200: string;
    lighten300: string;
    lighten400: string;
    sub: string;
    darken100: string;
    darken200: string;
    darken300: string;
    darken400: string;
  };

  bgDimBlack: string;
  gallCardBg: string;
  userChatGreen: string;
  error: string;
  error100: string;
  error200: string;
  error400: string;
  error500: string;
  success: string;
  success100: string;
  success200: string;
  success400: string;
  success500: string;
  warning: string;
  warning100: string;
  warning200: string;
  warning300: string;
  warning400: string;
  warning500: string;
  info: string;
  info100: string;
  info200: string;
  info400: string;
  info500: string;
};

export const basicThemeColors: ThemeColors = {
  white: '#FFFFFF',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',
  fontGray: '#7D828C',

  primary: {
    lighten100: '#F4F4F8',
    lighten200: '#E2E1EB',
    lighten300: '#D1CFDF',
    lighten400: '#BFBCD3',
    primary: '#ADAAC7',
    darken100: '#817CA9',
    darken200: '#5A5682',
    darken300: '#3A3754',
    darken400: '#1A1926',
  },
  sub: {
    lighten100: '#D4D5D6',
    lighten200: '#A9ABAD',
    lighten300: '#7F8184',
    lighten400: '#54575B',
    sub: '#292D32',
    darken100: '#212428',
    darken200: '#191B1E',
    darken300: '#101214',
    darken400: '#08090A',
  },
  bgDimBlack: '#292D324D',

  gallCardBg: 'rgba(41,45,50,0.6)',

  userChatGreen: '#2EE7D3',
  error: '#D23838',
  error100: '#FEEFEF',
  error200: '#F48989',
  error400: '#C31212',
  error500: '#AB1010',

  success: '#287D3C',
  success100: '#EDF9F0',
  success200: '#5ACA75',
  success400: '#226A33',
  success500: '#1C5629',

  warning: '#B95000',
  warning100: '#FFF4EC',
  warning200: '#FF8F39',
  warning300: '#B95000',
  warning400: '#9F4500',
  warning500: '#863A00',

  info: '#2E5AAC',
  info100: '#EEF2FA',
  info200: '#89A7E0',
  info400: '#294F98',
  info500: '#234584',
} as const;

export const lightThemeColors: ThemeColors = {
  ...basicThemeColors,
  sub: {
    ...basicThemeColors.sub,
    sub: '#FFFFFF',
  },
  white: '#000000',
  gray600: '#D1D5DB',
  gray300: '#7D828C',
};
