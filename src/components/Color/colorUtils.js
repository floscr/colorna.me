/* eslint-disable */

/**
 * Return the luma from a hex color string
 *
 * @param {string} color Hex color with #
 * @returns {Int} Luma value 0 - 100 where:
 *                0 = Darkest
 *                100 = Brightest
 */
export function lumaFromColor (color) {
  const c = color.substring(1) // strip #
  const rgb = parseInt(c, 16)  // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff // extract red
  const g = (rgb >>  8) & 0xff // extract green
  const b = (rgb >>  0) & 0xff // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

  return luma
}

export function lightenDarkenColor(col, amt) {

  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}
