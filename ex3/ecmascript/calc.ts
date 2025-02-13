export const num = 1;

export const add = (a: number, b: number): number => {
  return a + b;
};

export const sub = (a: number, b: number): number => {
  return a - b;
};

export default function (a: number): String {
  console.log(`input a : ${a}`);
  return "test";
}
