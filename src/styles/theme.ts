// Theme configuration with CSS-in-JS styles
export const theme = {
  colors: {
    primary: {
      blue: '#3b82f6',
      purple: '#9333ea',
      gradient: 'linear-gradient(to right, #3b82f6, #9333ea)',
    },
    secondary: {
      green: '#10b981',
      yellow: '#fbbf24',
      red: '#ef4444',
    },
    background: {
      light: '#ffffff',
      dark: '#1f2937',
      gradient: 'linear-gradient(to bottom right, #eef2ff, #ffffff, #ecfeff)',
      gradientDark: 'linear-gradient(to bottom right, #111827, #1f2937, #111827)',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      light: '#ffffff',
    },
    border: {
      light: 'rgba(255, 255, 255, 0.2)',
      default: '#e5e7eb',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
};

export type Theme = typeof theme;
