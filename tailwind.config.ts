import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    boxShadow: {
      brand: '2px 2px 6px rgba(0,0,0,0.25)',
    },
    colors: {
      primary: '#038AF2',
      'primary-10': 'rgb(3, 138, 242, 0.15)',
      'primary-dark': '#0264B1',
      sunset: '#424299',
      'sunset-10': 'rgb(66, 66, 153, 0.15)',
      'sunset-2': '#B66180',
      'sunset-2-10': 'rgb(182, 97, 128, 0.15)',
      secondary: '#FDE9C9',
      'secondary-dark': '#F9B952',
      darkish: '#012847',
      dark: '#12122B',
      light: '#F7FAFD',
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
