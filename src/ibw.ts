import { Gender } from "./gender";

/**
 * The IBWEquation enum is used to distinguish between different methods of calculating
 * ideal body weight.
 */
export enum IBWEquation {
  /**
   * Calculate using the Robinson equation.
   */
  Robinson,
  /**
   * Calculate using the Miller equation.
   */
  Miller,
  /**
   * Calculate using the Devine equation.
   */
  Devine,
  /**
   * Calculate using the Hamwi equation.
   */
  Hamwi,
}

/**
 * Calculates the ideal body weight in kilograms for the subject using the specified equation.
 * @param height The subject's height in centimeters.
 * @param gender The subject's gender.
 * @param equation The equation to use for calculation.
 */
export function ibw(
  height: number,
  gender: Gender,
  equation: IBWEquation,
): number {
  let result = 0;
  switch (equation) {
    case IBWEquation.Robinson:
      result = robinson(height, gender);
      break;
    case IBWEquation.Miller:
      result = miller(height, gender);
      break;
    case IBWEquation.Devine:
      result = devine(height, gender);
      break;
    case IBWEquation.Hamwi:
      result = hamwi(height, gender);
      break;
    default:
      throw new Error("invalid equation type");
  }

  return Math.round(result * 10) / 10;
}

function hamwi(height: number, gender: Gender): number {
  let baseline = 48.0;
  let multiplier = 2.7;
  if (gender === Gender.Female) {
    baseline = 45.5;
    multiplier = 2.2;
  }

  const feet = height / 30.48;
  const inchesAboveFiveFoot = (feet - 5) * 12;
  return baseline + inchesAboveFiveFoot * multiplier;
}

function devine(height: number, gender: Gender): number {
  let baseline = 50;
  const multiplier = 2.3;
  if (gender === Gender.Female) {
    baseline = 45.5;
  }

  const feet = height / 30.48;
  const inchesAboveFiveFoot = (feet - 5) * 12;
  return baseline + inchesAboveFiveFoot * multiplier;
}

function robinson(height: number, gender: Gender): number {
  let baseline = 52.0;
  let multiplier = 1.9;
  if (gender === Gender.Female) {
    baseline = 49;
    multiplier = 1.7;
  }

  const feet = height / 30.48;
  const inchesAboveFiveFoot = (feet - 5) * 12;
  return baseline + inchesAboveFiveFoot * multiplier;
}

function miller(height: number, gender: Gender): number {
  let baseline = 56.2;
  let multiplier = 1.41;
  if (gender === Gender.Female) {
    baseline = 53.1;
    multiplier = 1.36;
  }

  const feet = height / 30.48;
  const inchesAboveFiveFoot = (feet - 5) * 12;
  return baseline + inchesAboveFiveFoot * multiplier;
}
