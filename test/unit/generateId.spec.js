const generateId = require('../../src/utils/generateId')

describe('Generate Id', () => {
  it('should generate an hexadecimal ID', () => {
    expect(generateId()).toHaveLength(8)
  })
})
