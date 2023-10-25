import numeral from 'numeral';

import { BasicTable } from '@components/table/BasicTable';
import { ComponentExplainCard } from '@components/view/ComponentExplainCard';

export const BasicTableSample = () => {
  return (
    <ComponentExplainCard
      title='테이블 (BasicTable)'
      description={
        '별다른 옵션 없이 사용 가능한 기본 테이블입니다.\ncolum 정보를 정의한 뒤 데이터를 JSON Array 형식으로 삽입하는 것으로 사용 가능합니다.\n캡션 정보를 커스텀하여 삽입할 수도 있습니다.'
      }
    >
      <BasicTable
        captionPosition='top'
        caption={
          <div className='mb-2 flex w-full flex-row justify-between'>
            <h3 className='sticky left-0 rounded-full bg-primary px-[1em] py-[0.1em] text-lg font-normal text-[#ffffff]'>
              캡션 삽입
            </h3>
            <span className='ml-auto font-light'>(단위 : 만원)</span>
          </div>
        }
        columns={[
          {
            header: '단',
            accessorKey: 'unit',
          },
          {
            header: '2층 (달실)',
            columns: [
              {
                header: '개인단',
                columns: [
                  {
                    accessorKey: 'sec-one-side',
                    header: '측면',
                    cell: (info) =>
                      numeral(info.getValue<number>()).format(`00,0`),
                  },
                  {
                    accessorKey: 'sec-one-front',
                    header: '정면',
                    cell: (info) =>
                      numeral(info.getValue<number>()).format(`00,0`),
                  },
                ],
              },
              {
                accessorKey: 'sec-pair',
                header: '부부단',
                cell: (info) => numeral(info.getValue<number>()).format(`00,0`),
              },
            ],
          },
          {
            header: '2층 (달실)',
            columns: [
              {
                header: '개인단',
                columns: [
                  {
                    accessorKey: 'thir-one-side',
                    header: '측면',
                    cell: (info) =>
                      numeral(info.getValue<number>()).format(`00,0`),
                  },
                  {
                    accessorKey: 'thir-one-front',
                    header: '정면',
                    cell: (info) =>
                      numeral(info.getValue<number>()).format(`00,0`),
                  },
                ],
              },
              {
                accessorKey: 'thir-pair',
                header: '부부단',
                cell: (info) => numeral(info.getValue<number>()).format(`00,0`),
              },
            ],
          },
        ]}
        data={[
          [5, 5000000, 3000000, 4000000, 3000000, 6000000, 6000000],
          [4, 5000000, 3000000, 4000000, 3000000, 6000000, 6000000],
          [3, 4000000, 3000000, 4000000, 3000000, 6000000, 6000000],
          [2, 4000000, 3000000, 4000000, 3000000, 6000000, 6000000],
          [1, 2000000, 3000000, 4000000, 3000000, 6000000, 6000000],
        ].map((row) => ({
          'unit': row[0],
          'sec-one-side': row[1],
          'sec-one-front': row[2],
          'sec-pair': row[3],
          'thir-one-side': row[4],
          'thir-one-front': row[5],
          'thir-pair': row[6],
        }))}
        className='flex h-fit w-full flex-col gap-12'
      />
    </ComponentExplainCard>
  );
};
