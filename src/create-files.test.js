require = require('esm')(module);

const { isClassComponent, getComponentType } = require('./create-files')

describe('isClassComponent', () => {
  it('should return true if it is a class component', () => {
    expect(isClassComponent('pure')).toBeTruthy()
    expect(isClassComponent('class')).toBeTruthy()
  })

  it('should return false with a non class component', () => {
    expect(isClassComponent('func')).toBeFalsy()
  })
})

describe('getComponentType', () => {
  it('should return pure component type', () => {
    expect(getComponentType('pure')).toBe('PureComponent')
  })

  it('should return class component type', () => {
    expect(getComponentType('class')).toBe('Component')
  })
})
