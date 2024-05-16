import { Gender } from "./gender";

/**
 * The BMREquation enum is used to distinguish between different methods of calculating
 * basal metabolic rate.
 */
export enum BMREquation {
  /**
   * Calculate using the Mifflin-St Jeor equation.
   */
  Mifflin,
  /**
   * Calculate using the revised Harris-Benedict equation.
   */
  HarrisBenedict,
}

/**
 * Calculates basal metabolic rate using the desired equation based on the provided parameters.
 * @param age The age of the subject in years.
 * @param height The height of the subject in centimeters.
 * @param weight The weight of the subject in kilograms.
 * @param gender The gender of the subject.
 * @param equation The equation to use.
 */
export function bmr(
  age: number,
  height: number,
  weight: number,
  gender: Gender,
  equation: BMREquation,
): number {
  let result = 0;
  switch (equation) {
    case BMREquation.HarrisBenedict:
      result = harrisBenedict(age, height, weight, gender);
      break;
    case BMREquation.Mifflin:
      result = mifflin(age, height, weight, gender);
      break;
    default:
      throw new Error("invalid equation type");
  }

  return Math.round(result);
}

function harrisBenedict(
  age: number,
  height: number,
  weight: number,
  gender: Gender,
): number {
  let weightModifier = 13.397;
  let heightModifier = 4.799;
  let ageModifier = 5.677;
  let modifier = 88.362;

  if (gender === Gender.Female) {
    weightModifier = 9.247;
    heightModifier = 3.098;
    ageModifier = 4.33;
    modifier = 447.593;
  }

  return (
    weightModifier * weight +
    heightModifier * height -
    ageModifier * age +
    modifier
  );
}

function mifflin(
  age: number,
  height: number,
  weight: number,
  gender: Gender,
): number {
  const modifier = gender === Gender.Male ? 5 : -161;
  return 10 * weight + 6.25 * height - 5 * age + modifier;
}
