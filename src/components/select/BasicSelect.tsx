import { SelectProps } from '@radix-ui/react-select';

import { FormControl } from '@components/form/parts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/select/parts';

import { cn } from '@utils/tailwind';

export interface BasicSelectProps extends SelectProps {
  itemClassName?: string;
  className?: string; // triger 의 className
  placeholder?: string;
  isFormControl?: boolean;
  itemList: {
    label?: string;
    value: string;
    className?: string;
  }[];
}

export const BasicSelect = ({
  itemClassName,
  className,
  placeholder,
  isFormControl = false,
  itemList,
  ...props
}: BasicSelectProps) => {
  return (
    <Select {...props}>
      {isFormControl && (
        <FormControl>
          <SelectTrigger className={cn(className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
      )}
      {!isFormControl && (
        <SelectTrigger className={cn(className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      )}
      <SelectContent>
        {itemList &&
          itemList.length >= 1 &&
          itemList.map((item, i) => (
            <SelectItem
              value={item.value}
              key={`select-item-${i}`}
              className={cn(itemClassName, item.className)}
            >
              {item.label ?? item.value}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
