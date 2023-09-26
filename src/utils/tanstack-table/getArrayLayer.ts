export const getArrayLayer = (
  arr: any[],
  childrenName = 'columns',
  lev = 1,
) => {
  let level = lev;
  for (const item of arr) {
    let tempLev = lev;
    if (item[childrenName] && Array.isArray(item[childrenName])) {
      tempLev = getArrayLayer(item[childrenName], childrenName, (lev += 1));
      if (tempLev > level) {
        level = tempLev;
      }
    }
  }
  return level;
};
