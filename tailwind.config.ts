import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
  animation: {
    'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'border-glow': 'border-glow 3s linear infinite',
  },
  colors: {
    bodybg: '#f7f9fb',
  },
  keyframes: {
    'pulse-glow': {
      '0%, 100%': { 
        opacity: '0.1',
        transform: 'scale(0.95)' 
      },
      '50%': { 
        opacity: '0.3',
        transform: 'scale(1.05)' 
      },
    },
    'border-glow': {
      '0%': { 'background-position': '0% 50%' },
      '50%': { 'background-position': '100% 50%' },
      '100%': { 'background-position': '0% 50%' },
    }
  }
  
},
  },
  plugins: [],
};
export default config;
