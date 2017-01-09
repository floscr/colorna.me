import colorName from 'src/components/ColorNamePicker/utils/colorLib.js'

describe('colorLib', () => {

  it('#FFFFFF should return white', () => {
    expect(colorName('FFFFFF')).to.equal('White')
  })

  it('#000000 should return black', () => {
    expect(colorName('000000')).to.equal('Black')
  })

  console.log(colorName('#e20047'))

})
