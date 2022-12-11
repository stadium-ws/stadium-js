const DEFAULT_FONT_SIZE = 16

const theme = {
  colors: {
    primary: '#533E85',
    text: '#333333',
    error: '#FF5151',
    info: '#4299e1',
    warn: '#ecc94b',
    success: '#28DF99'
  },
  fonts: {
    defaultFontSize: DEFAULT_FONT_SIZE,
    defaultLineHeight: Math.round(DEFAULT_FONT_SIZE * 1.6),
    families: {
      primary: '\'Poppins\', sans-serif'
    }
  },
  containerWidth: 1140,
  narrowFormWidth: 420,
  mobilePadding: 10,
  borderRadius: {
    small: 4
  }
}

export default theme
