import { useBoolean } from 'usehooks-ts';

import { useRecoil } from '@hooks/useRecoil';

import { GlobalAlertDialogState } from '@components/alert/GlobalAlertDialogProvider';

export const useAlert = () => {
  const { value, setTrue, setFalse } = useBoolean(false);
  const { useRecoilState, useAtom } = useRecoil();
  const [state, setState] = useRecoilState(
    useAtom<GlobalAlertDialogState>('ALERT_DIALOG_STATE'),
  );

  const confirmClick = (
    questions: string | Pick<GlobalAlertDialogState, 'title' | 'description'>,
    options?: Omit<
      GlobalAlertDialogState,
      'title' | 'description' | 'isOpen' | 'type'
    >,
  ) => {
    if (value || state.isOpen) return; //더블 클릭 방지용
    setTrue(); //클릭 비활성화

    if (typeof questions == 'string') {
      questions = {
        title: '알림',
        description: questions,
      };
    }

    setState({
      isOpen: true,
      type: 'confirm',
      ...questions,
      ...options,
    });

    setTimeout(setFalse, 500); // 0.5초뒤 클릭 활성화
  };

  const alertClick = (
    questions: string | Pick<GlobalAlertDialogState, 'title' | 'description'>,
    options?: Omit<
      GlobalAlertDialogState,
      'title' | 'description' | 'isOpen' | 'type'
    >,
  ) => {
    if (value == true) return; //더블 클릭 방지용
    setTrue(); //클릭 비활성화

    if (typeof questions == 'string') {
      questions = {
        title: '알림',
        description: questions,
      };
    }

    setState({
      isOpen: true,
      type: 'alert',
      ...questions,
      ...options,
    });

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
