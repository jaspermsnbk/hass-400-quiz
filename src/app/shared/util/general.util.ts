import { DEVMODE } from "./penv.util";

export function log(...params: any) {
  if (DEVMODE) {
    params.forEach((element: any) => {
      console.log(element);
    });
  }
}

export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
