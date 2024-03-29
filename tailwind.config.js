/** @type {import('tailwindcss').Config} */
require('./src/plugins/tailwind/cssAsPlugin'); //css 파일을 tailwind plugins 로 변환하는 모듈, vscode 자동완성을 위해 적용하였다
const CustomCSS = require('./src/plugins/tailwind/custom.css'); // 추가하려는 custom css, cssAsPlugin 모듈로 인해 플러그인으로 자동 변환된다
const TailwindcssAnimatePlugin = require('tailwindcss-animate'); // tailwind 애니메이션 라이브러리
const NewTailwindcssAnimatedPlugin = require('tailwindcss-animated'); // tailwind 애니메이션 라이브러리
const TailwindCustomTheme = require('./src/plugins/tailwind/theme'); // tailwind 테마
const withMT = require("@material-tailwind/react/utils/withMT");

/**
 *
 * +++ 의존성 +++
 *
 * create-react-app 을 사용했기 때문에
 * postcss, postcss-preset-env ( autoprefixer 포함 ) 등의 플러그인이 자동으로 적용되어 있다
 *
 * postcss plugins = [
 *  "tailwindcss",
 *  "postcss-flexbugs-fixes",
 *  ["postcss-preset-env",{"autoprefixer":{"flexbox":"no-2009"},"stage":3}]
 * ]
 *
 * 만약 이설정값을 수정하고 싶으면 아래 플러그인의 코드를 참고하면 되지만, 추천은 하지 않는다
 * https://github.com/csstools/react-app-rewire-postcss/tree/master
 *
 */

module.exports = withMT({
  darkMode: ["class"],
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: TailwindCustomTheme,
  plugins: [
    CustomCSS,
    NewTailwindcssAnimatedPlugin,
    TailwindcssAnimatePlugin
  ],
});
