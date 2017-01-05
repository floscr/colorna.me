import colorLib from 'src/components/ColorNamePicker/utils/colorLib.js'

describe('colorLib', () => {

  it('It should return the color name matching the nearest Hex Color', () => {
    colorLib.init()
    expect(colorLib.name('#FFFFFF')[1]).to.equal('White')
  })

})
