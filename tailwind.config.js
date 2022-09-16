/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
    },
  },
};
