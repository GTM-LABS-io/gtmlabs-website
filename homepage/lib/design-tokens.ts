// ThreadFolio design tokens for the portfolio
export const slackTokens = {
  colors: {
    // Primary ThreadFolio colors
    primary: {
      50: '#f8f4ff',
      100: '#ede4ff', 
      200: '#ddd0ff',
      300: '#c7b2ff',
      400: '#a885ff',
      500: '#8b5cf6', // Main purple
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    
    // ThreadFolio workspace sidebar (aubergine)
    sidebar: {
      50: '#faf7ff',
      100: '#f3ecff',
      200: '#e9d5ff', 
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8', // Dark sidebar
      900: '#581c87',
      950: '#3f0e40', // Classic ThreadFolio sidebar
    },
    
    // ThreadFolio blue (active states, links)
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#1264a3', // ThreadFolio blue
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Status colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e', // Green for online status
      600: '#16a34a',
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b', // Yellow for warnings
      600: '#d97706',
    },
    
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444', // Red for errors
      600: '#dc2626',
    },
    
    // Neutral grays (ThreadFolio's refined palette)
    gray: {
      25: '#fcfcfd',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#0a0a0a',
    },
    
    // Semantic colors
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      sidebar: '#3f0e40',
      hover: '#f3f4f6',
      active: '#e5e7eb',
    },
    
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      tertiary: '#6b7280',
      inverse: '#ffffff',
      sidebar: '#ffffff',
      sidebarSecondary: '#d1d5db',
    },
    
    border: {
      light: '#e5e7eb',
      medium: '#d1d5db',
      dark: '#9ca3af',
      sidebar: '#522653',
    },
    
    // Interactive states
    interactive: {
      hover: '#f3f4f6',
      active: '#1264a3',
      focus: '#3b82f6',
      disabled: '#f3f4f6',
    },
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'] as string[],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'] as string[],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }] as [string, { lineHeight: string }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }] as [string, { lineHeight: string }],
      base: ['1rem', { lineHeight: '1.5rem' }] as [string, { lineHeight: string }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }] as [string, { lineHeight: string }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }] as [string, { lineHeight: string }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }] as [string, { lineHeight: string }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }] as [string, { lineHeight: string }],
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  spacing: {
    // ThreadFolio-specific spacing values
    0: '0px',
    1: '0.25rem', // 4px
    2: '0.5rem',  // 8px
    3: '0.75rem', // 12px
    4: '1rem',    // 16px
    5: '1.25rem', // 20px
    6: '1.5rem',  // 24px
    8: '2rem',    // 32px
    10: '2.5rem', // 40px
    12: '3rem',   // 48px
    16: '4rem',   // 64px
    20: '5rem',   // 80px
    24: '6rem',   // 96px
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  shadows: {
    // ThreadFolio's elevation system
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    hover: '0 4px 12px 0 rgb(0 0 0 / 0.15)',
    focus: '0 0 0 3px rgb(59 130 246 / 0.5)',
  },
  
  animation: {
    // ThreadFolio-inspired animations
    duration: {
      fast: '150ms',
      medium: '200ms',
      slow: '300ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // Component-specific tokens
  components: {
    sidebar: {
      width: '260px',
      backgroundColor: '#3f0e40',
      borderColor: '#522653',
    },
    
    message: {
      padding: '8px 20px',
      hoverBackground: '#f8f9fa',
      borderRadius: '8px',
    },
    
    avatar: {
      sizes: {
        xs: '24px',
        sm: '32px',
        md: '40px',
        lg: '48px',
        xl: '64px',
      },
    },
    
    channel: {
      padding: '6px 16px',
      activeBackground: '#1264a3',
      hoverBackground: 'rgba(255, 255, 255, 0.1)',
    },
  },
} as const

// Type helpers for design tokens
export type ThreadFolioColors = typeof slackTokens.colors
export type ThreadFolioTypography = typeof slackTokens.typography
export type ThreadFolioSpacing = typeof slackTokens.spacing

// CSS custom properties generator
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {}
  
  // Generate color variables
  Object.entries(slackTokens.colors).forEach(([category, colors]) => {
    if (typeof colors === 'object') {
      Object.entries(colors).forEach(([shade, value]) => {
        cssVars[`--color-${category}-${shade}`] = value
      })
    } else {
      cssVars[`--color-${category}`] = colors
    }
  })
  
  // Generate spacing variables
  Object.entries(slackTokens.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value
  })
  
  return cssVars
}