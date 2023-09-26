import { flatten } from '@utils/tanstack-table/flatten';

export const recursionColumns = (
  cols: any[],
  depth: number,
  layer: number,
  __order = 0,
): any[] => {
  return cols.map((item, i, arr) => {
    const obj = {
      ...item,
      __depth: depth,
      __order: i + __order,
    };
    if (!Object.prototype.hasOwnProperty.call(item, 'columns')) {
      if (layer > 1) {
        Object.assign(obj, {
          __rowSpan: layer,
        });
      }
      return obj;
    }
    // const rowSpan = depth === 0 ? layer : depth + 1;
    const flattenData = flatten(item.columns);
    const colSpan = flattenData.leafs.length;
    Object.assign(
      obj,
      {
        columns: recursionColumns(
          item.columns,
          depth + 1,
          layer,
          arr.length + __order + item.columns.length * i,
        ),
      },
      layer > 1
        ? {
            // __rowSpan: rowSpan,
            __colSpan: colSpan,
          }
        : {},
    );
    return obj;
  });
};
