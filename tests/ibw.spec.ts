import { describe, expect, it } from "@jest/globals";
import { Gender, ibw, IBWEquation } from "../src";

describe(ibw, () => {
  it("should calculate IBW for a male, using the Hamwi equation", () => {
    const height = 180;
    const expected = 77.3;

    const actual = ibw(height, Gender.Male, IBWEquation.Hamwi);
    expect(actual).toEqual(expected);
  });

  it("should calculate IBW for a female, using the Hamwi equation", () => {
    const height = 180;
    const expected = 69.4;

    const actual = ibw(height, Gender.Female, IBWEquation.Hamwi);
    expect(actual).toEqual(expected);
  });

  it("should calculate IBW for a male, using the Devine equation", () => {
    const height = 180;
    const expected = 75;

    const actual = ibw(height, Gender.Male, IBWEquation.Devine);
    expect(actual).toEqual(expected);
  });

  it("should calculate IBW for a female, using the Devine equation", () => {
    const height = 180;
    const expected = 70.5;

    const actual = ibw(height, Gender.Female, IBWEquation.Devine);
    expect(actual).toEqual(expected);
  });

  it("should calculate IBW for a male, using the Robinson equation", () => {
    const height = 180;
    const expected = 72.6;

    const actual = ibw(height, Gender.Male, IBWEquation.Robinson);
    expect(actual).toEqual(expected);
  });

  it("should calculate IBW for a female, using the Robinson equation", () => {
    const height = 180;
    const expected = 67.5;

    const actual = ibw(height, Gender.Female, IBWEquation.Robinson);
    expect(actual).toEqual(expected);
  });

  it("should calculate IBW for a male, using the Miller equation", () => {
    const height = 180;
    const expected = 71.5;

    const actual = ibw(height, Gender.Male, IBWEquation.Miller);
    expect(actual).toEqual(expected);
  });

  it("should calculate IBW for a female, using the Miller equation", () => {
    const height = 180;
    const expected = 67.9;

    const actual = ibw(height, Gender.Female, IBWEquation.Miller);
    expect(actual).toEqual(expected);
  });
});
