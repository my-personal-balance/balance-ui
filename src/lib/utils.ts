import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const paramsToSnakeCase = (params: Record<string, any>): any[] => {
  if (params) {
    if (params instanceof Array) {
      return params.map(p => paramsToSnakeCase(p))
    } else {
      const keyValues = Object.keys(params).map(key => {
        const newKey = key.replace(
          /[A-Z]/g,
          letter => `_${letter.toLowerCase()}`
        )

        let value = params[key]
        if (value && value instanceof Object && !value._isAMomentObject) {
          value = paramsToSnakeCase(params[key])
        }

        return { [newKey]: value }
      })

      return Object.assign({}, ...keyValues)
    }
  } else {
    return []
  }
}

/**
 * Formats a number according to specified options.
 *
 * @param {number} value - The number to format.
 * @param {Intl.NumberFormatOptions} options - Formatting options.
 * @returns {string} The formatted number.
 */
export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat(undefined, options).format(value)
}

/**
 * Generates a random number between 1 and 5 (inclusive).
 * @returns {number} A random integer between 1 and 5.
 */
export function getRandomNumber(): number {
  return Math.floor(Math.random() * 5) + 1
}

/**
 * Generates a random hex color code.
 * @returns {string} A random hex color code in the format '#RRGGBB'.
 */
export function getRandomColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}
