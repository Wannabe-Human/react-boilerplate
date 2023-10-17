import { HTMLAttributes, ReactNode, useMemo } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  TableBody,
  TableCaption,
  TableCaptionProps,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from '@components/table/parts';

import { cn } from '@utils/tailwind/cn';
import { CSSVariables } from '@utils/tailwind/cssVariables';
import { getArrayLayer, recursionColumns } from '@utils/tanstack-table';

export interface BasicTableProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<TableCaptionProps, 'captionAlign' | 'captionPosition'> {
  caption?: string | ReactNode;
  columns: ColumnDef<{ [name: string]: any }>[];
  data: { [name: string]: any }[];
}

export const BasicTable = ({
  className,
  caption,
  captionAlign,
  captionPosition,
  columns: initColums,
  data,
  ...props
}: BasicTableProps) => {
  const [columns] = useMemo<
    [ColumnDef<{ [name: string]: any }>[], number]
  >(() => {
    const layer = getArrayLayer(initColums);
    return [recursionColumns(initColums, 0, layer), layer];
  }, [initColums]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  });

  return (
    <section
      style={CSSVariables({
        head: {
          'bg-color': '#3c3c3b',
          'border-b-color': '#ffffff',
          'text-color': '#ffffff',
        },
        body: {
          'border-b-color': '#3c3c3b',
        },
      })}
      className={cn('flex w-full flex-col', className)}
      {...props}
    >
      <TableWrapper>
        {caption && (
          <TableCaption
            captionAlign={captionAlign}
            captionPosition={captionPosition}
          >
            {caption}
          </TableCaption>
        )}
        <TableHeader className='bg-[var(--head-bg-color)] [&_tr]:border-[var(--head-border-b-color)] [&_tr]:text-[var(--head-text-color)]'>
          {table
            .getHeaderGroups()
            .reduce((acc, cur) => {
              return acc.concat(
                cur.headers.filter((v) => !v.isPlaceholder) as any,
              );
            }, [])
            .reduce((acc, cur) => {
              // @ts-ignore
              const __depth = cur.column.columnDef.__depth;

              if (!Array.isArray(acc[__depth])) acc[__depth] = [cur];
              else acc[__depth].push(cur);
              return acc;
            }, [] as any[])
            .map((items) =>
              items.sort(
                (a: any, b: any) =>
                  a.column.columnDef.__order - b.column.columnDef.__order,
              ),
            )
            .map((headerGroup, i) => (
              <TableRow key={`table-row-${i}`}>
                {headerGroup.map((header: any) => {
                  // @ts-ignore
                  const __rowSpan = header?.column?.columnDef?.__rowSpan;
                  // @ts-ignore
                  const __colSpan = header?.column?.columnDef?.__colSpan;
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={__colSpan}
                      rowSpan={__rowSpan}
                      className='py-3 text-center text-sm font-medium lg:text-base'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody className='border-b-2 border-[var(--body-border-b-color)]'>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                className='border-b border-[var(--body-border-b-color)]'
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className='py-3 text-center text-sm font-medium lg:text-base'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableWrapper>
    </section>
  );
};
