export default (list) => {
  const createNode = (item, list) => ({
    ...item,
    children: createChildrens(item, list),
  });

  const createChildrens = (parentItem, list) => ( 
    list.reduce(
      (acc, listItem) => (
        listItem.parent === parentItem._id
          ? [
            ...acc,
            createNode(listItem, list),
          ]
          : acc
      ),
      [],
    )
  );

  return list.reduce(
    (acc, item) => {
      return !item.parent
        ?
          [
            ...acc,
            createNode(item, list),
          ]
        : acc
    },
    [],
  );
};
