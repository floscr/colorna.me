import { name } from 'src/components/ColorNamePicker/utils/colorLib.js'

describe('colorLib', () => {

  it('#FFFFFF should return white', () => {
    expect(name('FFFFFF')).to.equal('Black')
  })

  it('#000000 should return black', () => {
    expect(name('000000')).to.equal('Black')
  })

})
