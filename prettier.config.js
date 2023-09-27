module.exports = {
  /**
   * prettier options 적용 (전체)
   */
  semi: true, // 세미콜론 사용 여부
  tabWidth: 2, // 탭 너비
  singleQuote: true, // 작은따옴표 사용 ''
  jsxSingleQuote: true, // JSX에 singe 쿼테이션(작은따옴표) 사용 여부
  arrowParens: 'always', // 화살표 함수 괄호 사용 방식 (x) => x
  bracketSpacing: true, // 객체 리터럴에서 괄호에 공백 삽입 여부 { x : 9 }
  endOfLine: 'auto', // EoF 방식, OS별로 처리 방식이 다름, 줄바꿈 처리방식
  htmlWhitespaceSensitivity: 'css', // HTML 공백 감도 설정, 태그 양옆에 공백 여부 조정
  jsxBracketSameLine: false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부, false가 내리는것이다
  printWidth: 80, //  줄 바꿈 할 폭 길이
  proseWrap: 'preserve', // markdown 텍스트의 줄바꿈 방식 (v1.8.2), preserve = 비활성화
  quoteProps: 'consistent', // 객체 속성에 쿼테이션 적용 방식, 필요한 경우만 object key에 따옴표 적용
  trailingComma: 'all', // 여러 줄을 사용할 때, 후행 콤마 사용 방식(맨 마지막에 콤마 추가)
  useTabs: false, // 탭 사용 여부, false = 공백 사용
  // vueIndentScriptAndStyle: true, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
  // parser: '', // 사용할 parser를 지정, 자동으로 지정됨
  // filepath: '', // parser를 유추할 수 있는 파일을 지정
  rangeStart: 0, // 포맷팅을 부분 적용할 파일의 시작 라인 지정
  rangeEnd: Infinity, // 포맷팅 부분 적용할 파일의 끝 라인 지정,
  requirePragma: false, // 파일 상단에 미리 정의된 주석(Pragma)을 작성하고 포맷팅 사용 여부 지정 (v1.8.0), false 는 전체적용
  insertPragma: false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0), 사용 안함

  /**
   * 특정 파일별로 옵션을 다르게 지정
   */
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],

  /**
   * plugin 설정
   */
  tailwindConfig: './tailwind.config.js', // tailwind 설정파일 연동
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss', // tailwind 플러그인,가장 마지막에 로드되어야 함. 참고) https://github.com/tailwindlabs/prettier-plugin-tailwindcss#readme
  ],

  /**
   * import 순서 지정
   */
  importOrder: [
    '(^react$|^react/(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '^@layouts/(.*)$',
    '^@pages/(.*)$',
    '^@plugins/(.*)$',
    '^@hooks/(.*)$',
    '^@components/(.*)$',
    '^@utils/(.*)$',
    '^@/(.*)$',
    '^@mocks/(.*)$',
    '^@assets/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
