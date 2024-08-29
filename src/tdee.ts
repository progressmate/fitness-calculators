import { Gender } from "./gender";
import { bmr, BMREquation } from "./bmr";

/**
 * The TDEEEquation enumeration describes different equations that can be used to
 * calculate total daily energy expenditure.
 */
export enum TDEEEquation {
  /**
   * Calculate using the Mifflin-St Jeor equation.
   */
  Mifflin,
  /**
   * Calculate using the Katch-McArdle equation.
   */
  Katch,
}

/**
 * The ActivityLevel enum is used to describe a subject's general level of activity throughout the week.
 */
export enum ActivityLevel {
  /**
   * Little to no exercise
   */
  Sedentary,
  /**
   * Exercising 1-3 times a week.
   */
  Light,
  /**
   * Exercising 4-5 times a week.
   */
  Moderate,
  /**
   * Daily exercise or intense exercise 3-4 times a week.
   */
  Active,
  /**
   * Intense exercise 6-7 days a week.
   */
  VeryActive,
  /**
   * Very intense exercise daily, or physical job.
   */
  ExtraActive,
}

/**
 * Variables used to determine TDEE dependent on the equation used.
 */
export type TDEEOptions = {
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
  /**
   * How active the subject is.
   */
  activityLevel: ActivityLevel;
};

/**
 * Calculates total daily energy expended using the desired equation based on the provided parameters.
 * @param equation The equation to use to calculate TDEE.
 * @param options Options used to calculate TDEE.
 * @returns The calorie value of the TDEE.
 */
export function tdee(equation: TDEEEquation, options: TDEEOptions): number {
  validateTDEEOptions(equation, options);

  let result = 0;
  switch (equation) {
    case TDEEEquation.Mifflin:
      result = mifflin(
        options.age ?? 0,
        options.gender ?? 0,
        options.height ?? 0,
        options.weight ?? 0,
        options.activityLevel ?? 0,
      );
      break;
    case TDEEEquation.Katch:
      result = katch(
        options.weight ?? 0,
        options.activityLevel ?? 0,
        options.bodyFat ?? 0,
      );
      break;
    default:
      throw new Error("invalid equation type");
  }

  return Math.round(result);
}

function mifflin(
  age: number,
  gender: Gender,
  height: number,
  weight: number,
  activityLevel: ActivityLevel,
): number {
  const basal = bmr(BMREquation.Mifflin, {
    age,
    height,
    weight,
    gender,
  });

  return basal * activityLevelModifier(activityLevel);
}

function katch(
  weight: number,
  activityLevel: ActivityLevel,
  bodyFat: number,
): number {
  const basal = bmr(BMREquation.Katch, {
    weight,
    bodyFat,
  });

  return basal * activityLevelModifier(activityLevel);
}

function validateTDEEOptions(equation: TDEEEquation, options: TDEEOptions) {
  switch (equation) {
    case TDEEEquation.Mifflin:
      if (
        options.age &&
        options.weight &&
        options.gender !== undefined &&
        options.height &&
        options.activityLevel !== undefined
      ) {
        break;
      }

      throw new Error(
        "age, weight, gender, height & activity level are required for the Harris-Benedict equation.",
      );

    case TDEEEquation.Katch:
      if (
        options.weight &&
        options.activityLevel !== undefined &&
        options.bodyFat
      ) {
        break;
      }

      throw new Error(
        "weight, activity level & body fat percentage are required for the Katch-McArdle equation.",
      );
    default:
      throw new Error("invalid equation type");
  }
}

function activityLevelModifier(activityLevel: ActivityLevel): number {
  switch (activityLevel) {
    case ActivityLevel.Sedentary:
      return 1.2;
    case ActivityLevel.Light:
      return 1.375;
    case ActivityLevel.Moderate:
      return 1.465;
    case ActivityLevel.Active:
      return 1.55;
    case ActivityLevel.VeryActive:
      return 1.725;
    case ActivityLevel.ExtraActive:
      return 1.9;
  }
}
