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
  /**
   * Calculate using the Katch-McArdle equation.
   */
  Katch,
}

/**
 * Variables used to determine BMR dependent on the equation used.
 */
export type BMROptions = {
  /**
   * The subject's age.
   */
  age?: number;
  /**
   * The subject's height in centimeters.
   */
  height?: number;
  /**
   * The subject's weight in kilograms.
   */
  weight?: number;
  /**
   * The subject's gender.
   */
  gender?: Gender;
  /**
   * The subject's body fat percentage.
   */
  bodyFat?: number;
};

/**
 * Calculates basal metabolic rate using the desired equation based on the provided parameters.
 * @param equation The equation to use to calculate BMR.
 * @param options Options used to calculate BMR.
 * @returns The calorie value of the BMR.
 */
export function bmr(equation: BMREquation, options: BMROptions): number {
  validateBMROptions(equation, options);

  let result = 0;
  switch (equation) {
    case BMREquation.HarrisBenedict:
      result = harrisBenedict(
        options.age ?? 0,
        options.height ?? 0,
        options.weight ?? 0,
        options.gender ?? 0,
      );
      break;
    case BMREquation.Mifflin:
      result = mifflin(
        options.age ?? 0,
        options.height ?? 0,
        options.weight ?? 0,
        options.gender ?? 0,
      );
      break;
    case BMREquation.Katch:
      result = katch(options.weight ?? 0, options.bodyFat ?? 0);
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

function katch(weight: number, bodyFat: number): number {
  const bodyMass = weight * ((100 - bodyFat) / 100);
  const result = 370 + 21.6 * bodyMass;
  return Math.floor(result);
}

function validateBMROptions(equation: BMREquation, options: BMROptions) {
  switch (equation) {
    case BMREquation.HarrisBenedict:
      if (
        options.age &&
        options.weight &&
        options.gender !== undefined &&
        options.height
      ) {
        break;
      }

      throw new Error(
        "age, weight, gender & height are required for the Harris-Benedict equation.",
      );
    case BMREquation.Katch:
      if (options.weight && options.bodyFat) {
        break;
      }

      throw new Error(
        "weight and body fat percentage are required for the Katch-McArdle equation.",
      );
    case BMREquation.Mifflin:
      if (
        options.age &&
        options.weight &&
        options.gender !== undefined &&
        options.height
      ) {
        break;
      }

      throw new Error(
        "age, weight, gender & height are required for the Mifflin-St Jeor equation.",
      );
    default:
      throw new Error("invalid equation type");
  }
}
