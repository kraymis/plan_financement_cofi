/**
 * Format a number as Algerian Dinar (DA)
 * @param value - The numeric value to format
 * @returns Formatted string with thousand separators and " DA" suffix
 */
export function formatDA(value: number): string {
  return value.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' DA'
}

/**
 * Parse a string that may have spaces or DA suffix
 * @param value - The string to parse
 * @returns The parsed number
 */
export function parseDA(value: string): number {
  return parseInt(value.replace(/\s|DA/g, ''), 10) || 0
}
