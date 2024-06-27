export function toPercentage(
  decimal: number,
  decimalPlaces: number = 2,
): string {
  const percentage = (decimal * 100).toFixed(decimalPlaces);
  return `${percentage}%`;
}
