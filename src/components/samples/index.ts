import { FORM_SAMPLE_LIST } from '@components/samples/forms';
import { TABLE_SAMPLE_LIST } from '@components/samples/tables';
import { VIEW_SAMPLE_LIST } from '@components/samples/views';

type SampleCategory = 'table' | 'form' | 'view';
export const TOTAL_SAMPLE_LIST: {
  category: SampleCategory;
  sampleList: { id: string; sampleEl: () => JSX.Element }[];
}[] = [
  {
    category: 'table',
    sampleList: TABLE_SAMPLE_LIST,
  },
  {
    category: 'form',
    sampleList: FORM_SAMPLE_LIST,
  },
  {
    category: 'view',
    sampleList: VIEW_SAMPLE_LIST,
  },
];

export const SAMPLE_CATEGORY_LIST = TOTAL_SAMPLE_LIST.map(
  (sample) => sample.category,
);
