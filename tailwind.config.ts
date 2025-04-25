import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ['Comic Sans MS', 'cursive'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        wiggle: 'wiggle 2s infinite',
        'rainbow-border': 'rainbow-border 3s infinite',
        'bounce-custom': 'bounce-custom 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(10px, -10px) rotate(5deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'rainbow-border': {
          '0%': { borderColor: '#ff6b6b' },
          '25%': { borderColor: '#4ecdc4' },
          '50%': { borderColor: '#95e1d3' },
          '75%': { borderColor: '#ffd93d' },
          '100%': { borderColor: '#ff6b6b' },
        },
        'bounce-custom': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      scale: {
        102: '1.02',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [typography],
};

export default config;
