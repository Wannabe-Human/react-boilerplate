import { useBoolean } from 'usehooks-ts';

export const useAlert = () => {
  const { value, setTrue, setFalse } = useBoolean(false);
  //로그아웃
  const confirmClick = (click: () => void, questions: string) => {
    if (value == true) return; //더블 클릭 방지용
    setTrue(); //클릭 비활성화

    if (window.confirm(questions)) {
      click();
    }

    setTimeout(setFalse, 500); // 0.5초뒤 클릭 활성화
  };

  const alertClick = (click: () => void, questions: string) => {
    if (value == true) return; //더블 클릭 방지용
    setTrue(); //클릭 비활성화
    alert(questions);
    click();
    setTimeout(setFalse, 500); // 0.5초뒤 클릭 활성화
  };

  const promptClick = (
    click: (input?: string) => object,
    questions: string,
  ) => {
    if (value == true) return; //더블 클릭 방지용
    setTrue(); //클릭 비활성화
    const inputString = window.prompt(questions);

    if (inputString !== null) {
      // null == 취소 누름
      if (inputString === '') {
        click(undefined);
      } else {
        click(inputString);
      }
    }

    setTimeout(setFalse, 500); // 0.5초뒤 클릭 활성화
  };

  return {
    confirmClick,
    alertClick,
    promptClick,
  };
};

export interface LoginType {
  id: string;
  pw: string;
}
export interface SignupType {
  name: string;
  id: string;
  pw: string;
}
