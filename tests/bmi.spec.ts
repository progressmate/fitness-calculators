import { describe, expect, it } from "@jest/globals";
import { bmi } from "../src";

describe(bmi, () => {
  it("should calculate a BMI value with a single decimal place", () => {
    const height = 1.8;
    const weight = 76;
    const expected = 25.3;

    const actual = bmi(height, weight);

    expect(actual).toEqual(expected);
  });
});
