/** Склонение слова «вещь» по числу (рус.). */
export function productWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return 'вещей';
  if (mod10 === 1) return 'вещь';
  if (mod10 >= 2 && mod10 <= 4) return 'вещи';
  return 'вещей';
}
