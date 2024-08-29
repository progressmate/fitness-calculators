import { describe, expect, it } from "@jest/globals";
import { ActivityLevel, Gender, tdee, TDEEEquation } from "../src";

describe(tdee, () => {
  it("should calculate TDEE for a male, using Mifflin-St Jeor", () => {
    const height = 180;
    const weight = 78;
    const age = 30;
    const expected = 3344;

    const actual = tdee(TDEEEquation.Mifflin, {
      height,
      weight,
      age,
      gender: Gender.Male,
      activityLevel: ActivityLevel.ExtraActive,
    });

    expect(actual).toEqual(expected);
  });

  it("should calculate TDEE for a female, using Mifflin-St Jeor", () => {
    const height = 180;
    const weight = 78;
    const age = 30;
    const expected = 3029;

    const actual = tdee(TDEEEquation.Mifflin, {
      height,
      weight,
      age,
      gender: Gender.Female,
      activityLevel: ActivityLevel.ExtraActive,
    });

    expect(actual).toEqual(expected);
  });

  it("should calculate TDEE using Katch-McArdle", () => {
    const weight = 78;
    const bodyFat = 10;
    const expected = 3583;

    const actual = tdee(TDEEEquation.Katch, {
      bodyFat,
      weight,
      activityLevel: ActivityLevel.ExtraActive,
    });

    expect(actual).toEqual(expected);
  });

  it("should throw an error for invalid options", () => {
    const options = { activityLevel: ActivityLevel.Active };

    expect(() => tdee(TDEEEquation.Katch, options)).toThrowError();
    expect(() => tdee(TDEEEquation.Mifflin, options)).toThrowError();
  });

  it("should calculate TDEE using different activity levels", () => {
    const levels = [
      ActivityLevel.Sedentary,
      ActivityLevel.Light,
      ActivityLevel.Moderate,
      ActivityLevel.Active,
      ActivityLevel.VeryActive,
      ActivityLevel.ExtraActive,
    ];

    const expects = [2263, 2593, 2763, 2923, 3253, 3583];

    const weight = 78;
    const bodyFat = 10;

    for (let i = 0; i < levels.length; i++) {
      const activityLevel = levels[i];
      const expected = expects[i];

      const actual = tdee(TDEEEquation.Katch, {
        bodyFat,
        weight,
        activityLevel,
      });

      expect(actual).toEqual(expected);
    }
  });
});
