require = require('esm')(module)

const { isClassComponent, getComponentType, getExportComponentName } = require('./create-files')

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

describe('getExportComponentName', () => {
  it('should return component name wrapped with React.memo', () => {
    const componentName = 'Test'
    const options = {
      type: 'class',
      withMemo: true
    }
    expect(getExportComponentName(componentName, options)).toBe(`React.memo(${componentName})`)

    options.type = 'func'
    expect(getExportComponentName(componentName, options)).toBe(`React.memo(${componentName})`)
  })

  it('should return component name not wrapped with React.memo', () => {
    const componentName = 'Test'
    const options = {
      type: 'pure',
      withMemo: false
    }
    expect(getExportComponentName(componentName, options)).toBe(componentName)

    options.withMemo = false
    expect(getExportComponentName(componentName, options)).toBe(componentName)

    options.type = 'func'
    expect(getExportComponentName(componentName, options)).toBe(componentName)
  })
})
