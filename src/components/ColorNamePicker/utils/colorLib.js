/* eslint-disable */
/*
n_match[0]; // This is the RGB value of the closest matching color
n_match[1]; // This is the text string for the name of the match
n_match[2]; // True if exact color match, False if close-match
*/

import tinycolor from 'tinycolor2'
import colorNames from './colorNames.js'

export default function name (color) {

  const colorObj = tinycolor(color)


  // Throw error on invalid color
  if (!colorObj.isValid()) throw 'Not a valid color'

  const { r, g, b } = colorObj.toRgb()
  const { h, s, l } = colorObj.toHsl()

  // Get uppercase hex string
  const hexColor = colorObj.toHexString().toUpperCase()

  let closestMatch = -1
  let df = -1

  for (let i = 0; i < colorNames.length; i++) {

    const [ index, value ] = colorNames[i]

    const tinyColorObj = tinycolor(`#${index}`)
    const rgb = tinyColorObj.toRgb()
    const hsl = tinyColorObj.toHsl()

    colorNames[i].push(rgb.r, rgb.g, rgb.b, hsl.h, hsl.s, hsl.l)

    // Exact color match
    if (hexColor === `#${index}`) return value

    // console.log(colorNames[i])

    const ndf1 = Math.pow(r - colorNames[i][2], 2) + Math.pow(g - colorNames[i][3], 2) + Math.pow(b - colorNames[i][4], 2)
    const ndf2 = Math.pow(h - colorNames[i][5], 2) + Math.pow(s - colorNames[i][6], 2) + Math.pow(l - colorNames[i][7], 2)
    const ndf = ndf1 + ndf2 * 2

    if (df < 0 || df > ndf) {
      df = ndf
      closestMatch = i
    }
  }

  return colorNames[closestMatch][1]
}
