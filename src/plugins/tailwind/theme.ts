import { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

import { I_GLOBAL as GLOBAL } from './globalStyleProcessor';

// buid 할때, 절대경로를 인식못해서, 상대경로로 첨부

const theme: Config['theme'] = {
  var: {
    header: {
      height: {
        mobile: GLOBAL('header.height.mobile').valueUnit,
        pc: GLOBAL('header.height.pc').valueUnit,
      },
    },
    bottomNav: {
      height: {
        mobile: GLOBAL('bottomNav.height.mobile').valueUnit,
      },
    },
  },
  container: {
    center: true,
    padding: {
      DEFAULT: '5px',
      // sm: 'theme(var.quickmenu.width)',
    },
    screens: {
      sm: GLOBAL('screen.sm').configStyle,
      md: GLOBAL('screen.md').configStyle,
      lg: GLOBAL('screen.lg').configStyle,
      xl: GLOBAL('screen.xl').configStyle,
    },
  },
  //기본 테마에서 확장시킬때
  extend: {
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: 'calc(var(--radius) - 4px)',
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
      NotoSansKr: ['Noto Sans KR'],
      NanumSquarNeo: ['Nanum Squar Neo'],
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
  },
};

export default theme;
