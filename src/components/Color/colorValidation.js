/**
 * Check if a string is a hex color
 * consisting of either 3 or 6 characters and with or without #
 * @param {string} color Color definition as a string
 * @return {boolean} If the color is a hex or not
 */
export function isHex (color) {
  return /(^(#)?[0-9A-F]{6}$)|(^(#)?[0-9A-F]{3}$)/i.test(color)
}
