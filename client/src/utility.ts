export function isArrayEmpty<T>(arr: T[] | null | undefined): boolean {
  return !Array.isArray(arr) || arr.length === 0;
}