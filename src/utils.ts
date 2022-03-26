export const utils = {
  round(number: number, precision: number) {
    let factor = 10 ** precision;
    return Math.round(number * factor) / factor;
  },
  randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
