export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const easeOut = [0.25, 1, 0.5, 1] as const;
