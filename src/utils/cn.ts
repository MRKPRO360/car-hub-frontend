/* eslint-disable @typescript-eslint/no-unused-vars */
type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, boolean>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const inputClasses = inputs
    .flatMap((input) => {
      if (typeof input === 'string') {
        return input.split(' ');
      }
      if (typeof input === 'object' && input !== null) {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .filter((cls) => cls.trim())
    .filter(Boolean);

  return [...new Set(inputClasses)].join(' ').trim();
}
