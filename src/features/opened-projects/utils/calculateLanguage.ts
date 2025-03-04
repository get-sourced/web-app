export const CalculateLanguage = (val: { [key: string]: number } | null) => {
  if (!val) return null;
  let total = 1;
  const returnVal: { key: string; val: number }[] = [];
  for (const key in val) {
    total += val[key];
  }
  for (const key in val) {
    returnVal.push({ key: key, val: val[key] / total });
  }
  return returnVal;
};
