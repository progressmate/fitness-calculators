/**
 * Calculates body mass index based on the provided height & weight values.
 * @param height The height of the subject, in meters.
 * @param weight The weight of the subject, in kilograms.
 */
export function bmi(height: number, weight: number): number {
  const raw = weight / (height ^ 2);

  return Math.round(raw * 10) / 10;
}
