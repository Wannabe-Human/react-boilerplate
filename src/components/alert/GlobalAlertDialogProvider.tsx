import { useCallback, useEffect, useState } from 'react';

import type { unstable_BlockerFunction as BlockerFunction } from 'react-router-dom';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

import { useRecoil } from '@hooks/useRecoil';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/alert/parts';

export interface GlobalAlertDialogProviderProps {}

export interface GlobalAlertDialogState {
  isOpen: boolean;
  title: string;
  description?: string;
  type: 'alert' | 'confirm';
  isBlock?: boolean;
  delay?: number;
  onClick?: () => void;
}

export const GlobalAlertDialogProvider = ({
  ...props
}: GlobalAlertDialogProviderProps) => {
  const { useRecoilState, useAtom } = useRecoil();
  const [state, setState] = useRecoilState(
    useAtom<GlobalAlertDialogState>('ALERT_DIALOG_STATE'),
  );
  const [timer, setTimer] = useState(-1);
  const [check, setCheck] = useState(false);

  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
      state.isOpen &&
      state.isBlock == true &&
      currentLocation.pathname !== nextLocation.pathname,
    [state],
  );
  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    if (state.isOpen) setState({ ...state, isOpen: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timerModule = useCallback(
    () =>
      setTimer((time) => {
        console.log('반복 실행', time);
        if (time >= 0) {
          setTimeout(() => timerModule(), 500);
          return time - 500;
        } else {
          return -1;
        }
      }),
    [setTimer],
  );

  useEffect(() => {
    if (!state.isOpen && blocker.state === 'blocked') {
      blocker.reset();
    }

    if (
      state.isOpen &&
      state.delay != undefined &&
      state.delay > 0 &&
      check == false
    ) {
      setCheck(true);
      setTimer(state.delay);
      setTimeout(() => timerModule(), 500);
    }

    if (!state.isOpen && check) {
      setCheck(false);
    }
  }, [state, blocker, timer, setTimer, timerModule, check, setCheck]);

  return (
    <AlertDialog
      {...props}
      open={state.isOpen}
      onOpenChange={(open) => {
        setState({ ...state, isOpen: open });
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{state.title}</AlertDialogTitle>
          {state.description && (
            <AlertDialogDescription>{state.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {timer >= 0 && (
          <AlertDialogFooter>
            <p className='text-right leading-[1.4em]'>
              ... 업데이트 중{' '}
              <span className='inline-flex w-[1em] justify-end'>
                {Math.round(timer / 1000)}
              </span>
              초 후 종료
            </p>
          </AlertDialogFooter>
        )}
        {timer < 0 && (
          <AlertDialogFooter>
            {state.type != 'alert' && (
              <AlertDialogCancel
                disabled={state.delay != undefined && timer >= 0}
              >
                취소
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              disabled={state.delay != undefined && timer >= 0}
              onClick={() => {
                if (state.onClick) state.onClick();
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
