import { Fragment } from 'react';

import { SAMPLE_CATEGORY_LIST, TOTAL_SAMPLE_LIST } from '@components/samples';

export const ComponentsExplainPage = () => {
  const CATEGORY_LIST = SAMPLE_CATEGORY_LIST;
  return (
    <div className='h-fit w-full space-y-10'>
      {TOTAL_SAMPLE_LIST.filter((sampleGroup) =>
        CATEGORY_LIST.includes(sampleGroup.category),
      ).map((sampleGroup, i) => (
        <Fragment key={`category-${sampleGroup.category}-${i}`}>
          {sampleGroup.sampleList.map(({ id, sampleEl: SampleEl }, k) => (
            <SampleEl
              key={`category-${sampleGroup.category}-${i}-${id}-${k}`}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};
