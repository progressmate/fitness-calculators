import { describe, expect, it } from "@jest/globals";
import { bmr, BMREquation, Gender } from "../src";

describe(bmr, () => {
  it("should calculate BMR for a male, using Mifflin-St Jeor", () => {
    const height = 180;
    const weight = 76;
    const age = 30;
    const expected = 1740;

    const actual = bmr(age, height, weight, Gender.Male, BMREquation.Mifflin);

    expect(actual).toEqual(expected);
  });

  it("should calculate BMR for a female, using Mifflin-St Jeor", () => {
    const height = 180;
    const weight = 76;
    const age = 30;
    const expected = 1574;

    const actual = bmr(age, height, weight, Gender.Female, BMREquation.Mifflin);

    expect(actual).toEqual(expected);
  });

  it("should calculate BMR for a male, using Harris-Benedict", () => {
    const height = 180;
    const weight = 76;
    const age = 30;
    const expected = 1800;

    const actual = bmr(
      age,
      height,
      weight,
      Gender.Male,
      BMREquation.HarrisBenedict,
    );

    expect(actual).toEqual(expected);
  });

  it("should calculate BMR for a female, using Harris-Benedict", () => {
    const height = 180;
    const weight = 76;
    const age = 30;
    const expected = 1578;

    const actual = bmr(
      age,
      height,
      weight,
      Gender.Female,
      BMREquation.HarrisBenedict,
    );

    expect(actual).toEqual(expected);
  });
});
