import { randomInt } from "crypto";

export function randomEnumValue(enums: any) {
  const values = Object.keys(enums);
  const enumKey = values[Math.floor(Math.random() * values.length)];
  return enums[enumKey];
}

export function generateRandomNumberString(length: number) {
  return ([...new Array(length)].map(() => randomInt(9))).join('');
}
