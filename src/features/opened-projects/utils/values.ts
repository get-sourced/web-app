export const langs = [
  "Javascript",
  "Python",
  "Golang",
  "Java",
  "C",
  "C#",
  "C++",
  "Typescript",
];
export const year = () => {
  const date = new Date().getFullYear();
  const YearArray = new Array(date - 2000).fill(0).map((_, i) => `${date - i}`);
  return YearArray;
};
