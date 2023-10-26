import { Fragment, HTMLAttributes } from 'react';
import { cn } from '@utils/tailwind/cn';
import { Separator } from '@components/line/Separator';
import { CSSVariables } from '@utils/tailwind/cssVariables';
import { useMediaQuery } from '@hooks/useMediaQuery';

interface HistoryItem {
  type: 'year' | 'feat';
  direction: 'left' | 'right';
  line?: boolean;
  title?: string;
  month?: string;
  explain?: string;
}

export interface HistoryViewProps extends HTMLAttributes<HTMLDivElement> {
  data: HistoryItem[];
}

export const HistoryView = ({
  className,
  data,
  ...props
}: HistoryViewProps) => {
  const { isMedia } = useMediaQuery();

  return (
    <section
      style={CSSVariables({
        'highlight-text-color': '#cfb730',
        center: {
          padding: '22px',
          'line-width': '1px',
        },
        feat: {
          space: '0.3em',
          font: '1rem',
        },
        year: {
          space: '0.5em',
        },
      })}
      className={cn(
        'grid w-full',
        isMedia('md', 'less')
          ? 'grid-cols-[20px_1.25rem_1fr]'
          : 'grid-cols-[1fr_1.25rem_1fr]',
        className,
      )}
      {...props}
    >
      {isMedia('lg', 'more') &&
        data.map((item, i) => {
          if (item.type == 'year') {
            if (item.direction == 'left')
              return (
                <Fragment key={`item-history-${i}`}>
                  <div className='flex w-full justify-end pr-[var(--center-padding)]'>
                    <h3 className='my-[var(--year-space)] text-xl leading-[2em] tracking-tight text-[var(--highlight-text-color)]'>
                      {item.title}
                    </h3>
                  </div>
                  <div className='flex h-full w-full flex-col items-center'>
                    <span
                      className={cn(
                        'h-full w-[var(--center-line-width)]',
                        i != 0 ? 'bg-[var(--highlight-text-color)]' : '', // 첫번재에서는 안나와야함
                      )}
                    />
                    <span className='w-full rounded-full bg-[var(--highlight-text-color)] pb-[100%]' />
                    <span className='h-full w-[var(--center-line-width)] bg-[var(--highlight-text-color)]' />
                  </div>
                  <div className='flex w-full items-center'>
                    {item.line && <Separator />}
                  </div>
                </Fragment>
              );
            if (item.direction == 'right')
              return (
                <Fragment key={`item-history-${i}`}>
                  <div className='flex w-full items-center'>
                    {item.line && <Separator />}
                  </div>
                  <div className='flex h-full w-full flex-col items-center'>
                    <span
                      className={cn(
                        'h-full w-[var(--center-line-width)]',
                        i != 0 ? 'bg-[var(--highlight-text-color)]' : '', // 첫번재에서는 안나와야함
                      )}
                    />
                    <span className='w-full rounded-full bg-[var(--highlight-text-color)] pb-[100%]' />
                    <span className='h-full w-[var(--center-line-width)] bg-[var(--highlight-text-color)]' />
                  </div>
                  <div className='flex w-full pl-[var(--center-padding)]'>
                    <h3 className='my-[var(--year-space)] text-xl leading-[2em] tracking-tight text-[var(--highlight-text-color)]'>
                      {item.title}
                    </h3>
                  </div>
                </Fragment>
              );
          }
          if (item.type == 'feat') {
            if (item.direction == 'left')
              return (
                <Fragment key={`item-history-${i}`}>
                  <div className='my-[var(--feat-space)] flex w-full flex-row justify-end space-x-8 pr-[var(--center-padding)] font-light tracking-wider text-[var(--feat-font)]'>
                    <h6 className='font-bold'>{item.month}</h6>
                    <p className='whitespace-pre-wrap'>{item.explain}</p>
                  </div>
                  <div className='flex h-full w-full justify-center'>
                    <span className='h-full w-[var(--center-line-width)] bg-[var(--highlight-text-color)]' />
                  </div>
                  <div />
                </Fragment>
              );
            if (item.direction == 'right')
              return (
                <Fragment key={`item-history-${i}`}>
                  <div />
                  <div className='flex h-full w-full justify-center'>
                    <span className='h-full w-[var(--center-line-width)] bg-[var(--highlight-text-color)]' />
                  </div>
                  <div className='my-[var(--feat-space)] flex w-full flex-row justify-start space-x-8 pl-[var(--center-padding)] font-light tracking-wider text-[var(--feat-font)]'>
                    <h6 className='font-bold'>{item.month}</h6>
                    <p className='whitespace-pre-wrap'>{item.explain}</p>
                  </div>
                </Fragment>
              );
          }
        })}
      {isMedia('md', 'less') &&
        data.map((item, i) => {
          if (item.type == 'year') {
            return (
              <Fragment key={`item-history-${i}`}>
                <div className='flex w-full justify-end '></div>
                <div className='flex h-full w-full flex-col items-center'>
                  <span
                    className={cn(
                      'h-full w-[var(--center-line-width)]',
                      i != 0 ? 'bg-[var(--highlight-text-color)]' : '', // 첫번재에서는 안나와야함
                    )}
                  />
                  <span className='w-full rounded-full bg-[var(--highlight-text-color)] pb-[100%]' />
                  <span className='h-full w-[var(--center-line-width)] bg-[var(--highlight-text-color)]' />
                </div>
                <div className='flex w-full items-center pl-[var(--center-padding)]'>
                  <h3 className='my-[var(--year-space)] mr-3 text-xl font-bold leading-[4em] tracking-tight text-[var(--highlight-text-color)]'>
                    {item.title}
                  </h3>
                  {item.line && <Separator />}
                </div>
              </Fragment>
            );
          }
          if (item.type == 'feat') {
            return (
              <Fragment key={`item-history-${i}`}>
                <div />
                <div className='flex h-full w-full justify-center'>
                  <span className='h-full w-[var(--center-line-width)] bg-[var(--highlight-text-color)]' />
                </div>
                <div className='my-[var(--feat-space)] flex w-full flex-row justify-start space-x-8 pl-[var(--center-padding)] pr-5 font-light tracking-wider text-[var(--feat-font)]'>
                  <h6 className='font-bold'>{item.month}</h6>
                  <p className='whitespace-pre-wrap'>{item.explain}</p>
                </div>
              </Fragment>
            );
          }
        })}
    </section>
  );
};
