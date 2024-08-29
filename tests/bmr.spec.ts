import { describe, expect, it } from "@jest/globals";
import { bmr, BMREquation, Gender } from "../src";

describe(bmr, () => {
  it("should calculate BMR for a male, using Mifflin-St Jeor", () => {
    const height = 180;
    const weight = 76;
    const age = 30;
    const expected = 1740;

    const actual = bmr(BMREquation.Mifflin, {
      age,
      height,
      weight,
      gender: Gender.Male,
    });

    expect(actual).toEqual(expected);
  });

  it("should calculate BMR for a female, using Mifflin-St Jeor", () => {
    const height = 180;
    const weight = 76;
    const age = 30;
    const expected = 1574;

    const actual = bmr(BMREquation.Mifflin, {
      age,
      height,
      weight,
      gender: Gender.Female,
    });

    expect(actual).toEqual(expected);
  });

  it("should calculate BMR for a male, using Harris-Benedict", () => {
    const height = 180;
    const weight = 76;
    const age = 30;
    const expected = 1800;

    const actual = bmr(BMREquation.HarrisBenedict, {
      age,
      height,
      weight,
      gender: Gender.Male,
    });

    expect(actual).toEqual(expected);
  });

  it("should calculate BMR for a female, using Harris-Benedict", () => {
    const height = 180;
    const weight = 76;
    const age = 30;
    const expected = 1578;

    const actual = bmr(BMREquation.HarrisBenedict, {
      age,
      height,
      weight,
      gender: Gender.Female,
    });

    expect(actual).toEqual(expected);
  });

  it("should calculate BMR using Katch-McArdle", () => {
    const weight = 76;
    const bodyFat = 10;
    const expected = 1847;
    const actual = bmr(BMREquation.Katch, {
      weight,
      bodyFat,
    });

    expect(actual).toEqual(expected);
  });

  it("should throw an error for invalid options", () => {
    expect(() => bmr(BMREquation.Katch, {})).toThrowError();
    expect(() => bmr(BMREquation.Mifflin, {})).toThrowError();
    expect(() => bmr(BMREquation.HarrisBenedict, {})).toThrowError();
  });
});
