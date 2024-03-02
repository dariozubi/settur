import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    boxShadow: {
      brand: '2px 2px 6px rgba(0,0,0,0.25)',
    },
    colors: {
      primary: '#038AF2',
      'primary-10': 'rgb(3, 138, 242, 0.15)',
      'primary-dark': '#0264B1',
      secondary: '#424299',
      'secondary-10': 'rgb(66, 66, 153, 0.15)',
      tertiary: '#B66180',
      'tertiary-10': 'rgb(182, 97, 128, 0.15)',
      darkish: '#012847',
      dark: '#12122B',
      light: '#F7FAFD',
    },
  },
  plugins: [],
}
export default config
