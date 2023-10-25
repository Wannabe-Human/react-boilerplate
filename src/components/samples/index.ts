import { TABLE_SAMPLE_LIST } from '@components/samples/tables';

type SampleCategory = 'table' | 'view';
export const TOTAL_SAMPLE_LIST: {
  category: SampleCategory;
  sampleList: { id: string; sampleEl: () => JSX.Element }[];
}[] = [
  {
    category: 'table',
    sampleList: TABLE_SAMPLE_LIST,
  },
  {
    category: 'view',
    sampleList: TABLE_SAMPLE_LIST,
  },
];

export const SAMPLE_CATEGORY_LIST = TOTAL_SAMPLE_LIST.map(
  (sample) => sample.category,
);
