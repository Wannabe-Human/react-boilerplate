/** @type {import('tailwindcss').Config} */
require('./src/plugins/tailwind/cssAsPlugin'); //css 파일을 tailwind plugins 로 변환하는 모듈
const CustomCSS = require('./src/plugins/tailwind/custom.css');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    CustomCSS
  ],
}

