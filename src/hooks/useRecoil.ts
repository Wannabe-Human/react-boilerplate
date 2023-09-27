import { useMemo } from 'react';

import {
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { atomFamilys, atoms } from '@plugins/recoil/atoms';

const AtomsKeyList = Object.keys(atoms);
const AtomFamilysKeyList = Object.keys(atomFamilys);
type AtomsType = keyof typeof atoms;
type AtomFamilysType = keyof typeof atomFamilys;

type TotalAtomType = AtomsType | AtomFamilysType;

export const useRecoil = () => {
  const useAtom = <T>(key: TotalAtomType): RecoilState<T> =>
    useMemo(() => {
      //atom 값 가져오기
      if (AtomsKeyList.includes(key)) {
        return atoms[key as AtomsType] as any as RecoilState<T>;
      }

      //atom famil 값 가져오기
      if (AtomFamilysKeyList.includes(key)) {
        return atomFamilys[key as AtomFamilysType] as any as RecoilState<T>;
      }

      throw new Error('유효하지 않은 atom key 입니다');
    }, [key]);

  const useAtomFamily = (key: AtomFamilysType) =>
    useMemo(() => {
      //atom famil 값 가져오기
      if (AtomFamilysKeyList.includes(key)) {
        return atomFamilys[key as AtomFamilysType];
      }

      throw new Error('유효하지 않은 atom family key 입니다');
    }, [key]);

  return {
    useAtom,
    useAtomFamily,
    useSetRecoilState,
    useRecoilValue,
    useRecoilState,
  };
};
