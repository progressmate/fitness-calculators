/**
 * Calculate the recommended daily fluid intake based on the subject's height and minutes of activity.
 * @param weight The subject's weight in kilograms.
 * @param activeMinutes The minutes per day the subject is active.
 * @returns The recommended fluid intake for the subject, in liters.
 */
export function fluidIntake(weight: number, activeMinutes: number): number {
  const pounds = weight * 2.20462;
  const base = pounds * 0.67;
  const extra = (activeMinutes / 30) * 12;

  return Math.floor((base + extra) * 0.0284131);
}
