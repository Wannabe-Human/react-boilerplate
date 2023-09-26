export const flatten = (
  arr: any[],
  parentKey?: string,
  childrenName = 'columns',
) => {
  const treeList = arr || [];

  const leafs = [];
  const roots = [];
  const list = [];

  for (let i = 0; i < treeList.length; i++) {
    const d = treeList[i];
    const children = d[childrenName] || [];
    list.push({ ...d, __depth: 1 });
    roots.push(d);
    if (children.length > 0) {
      getChildren(d, 2, d);
    } else {
      leafs.push(d);
    }
  }

  function getChildren(item: any, depth: number, parent: any) {
    const tempArr = item[childrenName] || [];
    for (let i = 0; i < tempArr.length; i++) {
      const d = tempArr[i];
      const children = d[childrenName] || [];
      list.push({
        ...d,
        __depth: depth,
        parentId: parent && parentKey ? parent[parentKey] : '',
      });
      if (children.length > 0) {
        getChildren(d, depth + 1, d);
      } else {
        leafs.push({
          ...d,
          parentId: parent && parentKey ? parent[parentKey] : '',
        });
      }
    }
  }
  return { list, leafs, roots };
};
