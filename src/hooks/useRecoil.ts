import { atoms, atomFamilys } from '@plugins/recoil/atoms';
import { useMemo } from 'react';
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  RecoilState,
} from 'recoil';

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
        throw new Error(
          'atomFamily key 입니다. 아직 기능이 정의되지 않았습니다',
        );
      }

      throw new Error('유효하지 않은 atom key 입니다');
    }, [key]);

  return { useAtom, useSetRecoilState, useRecoilValue, useRecoilState };
};
