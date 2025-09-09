let windowWidth = 1920; // SSR을 위한 기본값 또는 일반적인 데스크톱 너비
let windowHeight = 1080; // SSR을 위한 기본값 또는 일반적인 데스크톱 높이

// 브라우저 환경인지 확인
if (typeof window !== 'undefined') {
  windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
}
export const styleLayout = {
  windowHeight,
  windowWidth,
  sidePadding: 16,
  mainBlockGap: 15,
  mainBlockLv02Gap: 20,
} as const;

export const styleFontSize = {
  h1: '24px',
  h2: '20px',
  h3: '16px',
  h4: '14px',
  h5: '13px',
  h6: '16px',

  subtitle01: '14px',
  subtitle02: '8px',

  body01: '14px',
  body02: '8px',

  text01: '12px',
  text02: '7px',
  button: '8px',
  caption: '7px',
  tag: '7pxs',
} as const;

export const adminStyles = {
  table: {
    cell: {
      height: '48px',
      heightBig: '64px',
      fontSize: '16px',
    },
  },
  buttonSize: {
    width: {
      small: '46px',
      medium: '70px',
      large: '120px',
      xlarge: '180px',
      xxlarge: 'auto',
    },
    height: {
      small: '24px',
      medium: '24px',
      large: '40px',
      xlarge: '40px',
      xxlarge: '56px',
    },
    borderRadius: {
      small: '4px',
      medium: '4px',
      large: '12px',
      xlarge: '12px',
      xxlarge: '12px',
    },
    fontSize: {
      small: '12px',
      medium: '12px',
      large: '14px',
      xlarge: '14px',
      xxlarge: '14px',
    },
  },
} as const;
