/** @type {import('tailwindcss').Config} */
require('./src/plugins/tailwind/cssAsPlugin'); //css 파일을 tailwind plugins 로 변환하는 모듈
const CustomCSS = require('./src/plugins/tailwind/custom.css');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // prod 빌드시 사용하지 않는 css 를 제외하는 옵션 
  // 참고: https://v1.tailwindcss.com/docs/controlling-file-size
  purge: [ 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    CustomCSS
  ],
}

