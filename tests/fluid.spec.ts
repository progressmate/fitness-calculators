import { describe, expect, it } from "@jest/globals";
import { fluidIntake } from "../src";

describe(fluidIntake, () => {
  it("should calculate recommended fluid intake in liters", () => {
    const weight = 76;
    const activity = 160;
    const expected = 5;
    const actual = fluidIntake(weight, activity);

    expect(actual).toEqual(expected);
  });
});
