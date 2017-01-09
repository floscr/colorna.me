/* eslint-disable */
/*
n_match[0]; // This is the RGB value of the closest matching color
n_match[1]; // This is the text string for the name of the match
n_match[2]; // True if exact color match, False if close-match
*/

import tinycolor from 'tinycolor2'
import colorNames from './colorNames.js'

export default function name (color) {

  color = tinycolor(color)

  if (!color.isValid()) throw 'Not a valid color'

  // Get uppercase hex string
  const hexColor = color.toHexString().toUpperCase()

  for (let i = 0; i < colorNames.length; i++) {
    const index = colorNames[i][0]
    const value = colorNames[i][1]

    // Exact color match
    if (hexColor === `#${index}`) return value
  }

}
