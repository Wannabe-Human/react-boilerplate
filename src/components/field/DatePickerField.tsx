import { ButtonHTMLAttributes, forwardRef, useState } from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { ControllerRenderProps } from 'react-hook-form';

import { Button } from '@components/button/Button';
import { Calendar } from '@components/view/Calender';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/view/Popover';

import { cn } from '@utils/tailwind';

export interface DatePickerFieldProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: 'single' | 'range';
  dateFormat?: string;
  field: ControllerRenderProps<Date, any>;
}

export const DatePickerField = forwardRef<
  HTMLButtonElement,
  DatePickerFieldProps
>(({ mode, dateFormat = 'yyyy. MM. dd', field, className, ...props }, ref) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant={'outline'}
          className={cn(
            'w-[260px] justify-start text-left font-normal',
            !field.value && 'text-muted-foreground',
            className,
          )}
          {...props}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {mode == 'single' && field.value && format(field.value, dateFormat)}
          {mode == 'range' &&
            dateRange?.from &&
            (dateRange.to ? (
              <>
                {format(dateRange.from, dateFormat)} -{' '}
                {format(dateRange.to, dateFormat)}
              </>
            ) : (
              format(dateRange.from, dateFormat)
            ))}
          {!field.value && !dateRange?.from && <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        {mode == 'single' && (
          <Calendar
            mode='single'
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        )}
        {mode == 'range' && (
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        )}
      </PopoverContent>
    </Popover>
  );
});
DatePickerField.displayName = 'DatePickerField';
