export const theme = {
  colors: {
    navy: '#004EA8',
    navySoft: '#1684D8',
    orange: '#F37021',
    orangeSoft: '#FFF2E8',
    white: '#FFFFFF',
    background: '#F4FAFF',
    surface: '#FFFFFF',
    text: '#052C65',
    muted: '#536B82',
    line: '#D8E7F3',
    success: '#5BAF2B',
    warning: '#F2B705'
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    pill: 999
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 22,
    xl: 30
  },
  shadow: {
    shadowColor: '#004EA8',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4
  },
  typography: {
    fontFamily: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    extrabold: 'Inter_800ExtraBold',
    black: 'Inter_900Black'
  }
};

export type AppTheme = typeof theme;
