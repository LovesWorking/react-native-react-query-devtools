/**
 * updates nested data by path
 *
 * @param {unknown} oldData Data to be updated
 * @param {Array<string>} updatePath Path to the data to be updated
 * @param {unknown} value New value
 */
export const updateNestedDataByPath = (
  oldData: unknown,
  updatePath: Array<string>,
  value: unknown
): any => {
  if (updatePath.length === 0) {
    return value;
  }

  if (oldData instanceof Map) {
    const newData = new Map(oldData);

    if (updatePath.length === 1) {
      newData.set(updatePath[0], value);
      return newData;
    }

    const [head, ...tail] = updatePath;
    newData.set(head, updateNestedDataByPath(newData.get(head), tail, value));
    return newData;
  }

  if (oldData instanceof Set) {
    const setAsArray = updateNestedDataByPath(
      Array.from(oldData),
      updatePath,
      value
    );

    return new Set(setAsArray);
  }

  if (Array.isArray(oldData)) {
    const newData = [...oldData];

    if (updatePath.length === 1) {
      // @ts-expect-error NAS
      newData[updatePath[0]] = value;
      return newData;
    }

    const [head, ...tail] = updatePath;
    // @ts-expect-error NAS
    newData[head] = updateNestedDataByPath(newData[head], tail, value);

    return newData;
  }

  if (oldData instanceof Object) {
    const newData = { ...oldData };

    if (updatePath.length === 1) {
      // @ts-expect-error NAS
      newData[updatePath[0]] = value;
      return newData;
    }

    const [head, ...tail] = updatePath;
    // @ts-expect-error NAS
    newData[head] = updateNestedDataByPath(newData[head], tail, value);

    return newData;
  }

  return oldData;
};
