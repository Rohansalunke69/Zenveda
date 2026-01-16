/**
 * Design System for Zenveda
 * Premium AI Wellness SaaS Design Tokens
 */

export const colors = {
  // Backgrounds
  bg: {
    primary: '#0a0a0a',      // Near black, not pure black
    secondary: '#0d0d0d',    // Subtle gradient base
    tertiary: '#1a1a1a',     // Slightly lighter
    surface: '#141414',      // Surface color
  },

  // Text
  text: {
    primary: '#ffffff',      // Main text
    secondary: '#a1a1aa',    // Secondary text
    tertiary: '#71717a',     // Muted text
    inverted: '#0a0a0a',     // Inverted text for light backgrounds
  },

  // Accents - Premium Indigo
  accent: {
    primary: '#6366f1',      // Primary indigo
    secondary: '#818cf8',    // Lighter indigo
    muted: '#4f46e5',        // Darker indigo
    subtle: 'rgba(99, 102, 241, 0.1)',
    glow: 'rgba(99, 102, 241, 0.3)',
  },

  // Semantic
  success: '#10b981',
  error: '#ef4444',
  border: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(255, 255, 255, 0.12)',
};

// Glassmorphism tokens
export const glass = {
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: 'rgba(255, 255, 255, 0.08)',
    shadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
    shadowHover: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
  hero: {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(24px)',
    border: 'rgba(255, 255, 255, 0.06)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  cta: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
    backdropFilter: 'blur(24px)',
    border: 'rgba(99, 102, 241, 0.2)',
    shadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
  },
};

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  xxl: '4rem',     // 64px
  xxxl: '6rem',    // 96px
};

export const typography = {
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '2rem',      // 32px
    '4xl': '2.5rem',    // 40px
    '5xl': '3.5rem',    // 56px - Larger hero heading
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.15,
    normal: 1.6,
    relaxed: 1.75,
  },
};

export const layout = {
  maxWidth: '1280px', // Container max-width
  sectionGap: '6rem', // Gap between major sections
  cardGap: '1.5rem',  // Gap between cards in grid
  containerPadding: '2rem', // Horizontal padding on container
};

// Animation tokens - subtle and premium
export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth ease-out
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  },
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  },
  stagger: {
    container: { opacity: 0 },
    item: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
  hover: {
    scale: 1.02,
    lift: -8,
    transition: { duration: 0.3, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  },
};
