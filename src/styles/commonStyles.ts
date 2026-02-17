import { CSSProperties } from 'react';
import { theme } from './theme';

export const commonStyles = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  } as CSSProperties,

  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as CSSProperties,

  button: {
    base: {
      padding: '0.5rem 1rem',
      borderRadius: theme.borderRadius.md,
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: theme.transitions.normal,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    } as CSSProperties,
    primary: {
      background: theme.colors.primary.gradient,
      color: theme.colors.text.light,
      boxShadow: theme.shadows.lg,
    } as CSSProperties,
    outline: {
      background: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(10px)',
      border: `1px solid ${theme.colors.border.light}`,
      color: theme.colors.text.primary,
    } as CSSProperties,
    ghost: {
      background: 'transparent',
      color: theme.colors.text.primary,
    } as CSSProperties,
  },

  card: {
    base: {
      background: theme.colors.background.light,
      borderRadius: theme.borderRadius['2xl'],
      padding: theme.spacing.xl,
      boxShadow: theme.shadows.lg,
      transition: theme.transitions.normal,
      border: 'none',
    } as CSSProperties,
    hover: {
      transform: 'translateY(-0.5rem)',
      boxShadow: theme.shadows['2xl'],
    } as CSSProperties,
  },

  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: theme.borderRadius.full,
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'inline-block',
  } as CSSProperties,

  gradient: {
    text: {
      background: theme.colors.primary.gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    } as CSSProperties,
  },
};
