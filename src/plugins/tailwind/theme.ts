import { Config } from 'tailwindcss';

const theme : Config['theme'] = {

  //기본 테마에서 확장시킬때
  extend : {
    fontFamily: {
      NotoSansKr: ['Noto Sans KR']
    }
  }
};

export default theme;