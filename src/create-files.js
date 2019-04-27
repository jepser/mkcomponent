import fs from 'fs'
import path from 'path'
import toPascalCase from 'to-pascal-case'

const isClassComponent = (type) => ['class', 'pure'].includes(type) ? type : false
const getComponentType = type => type === 'pure' ? 'PureComponent' : 'Component'

const copyTemplate = ({ file, target, transform = i => i }) => {

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../templates',
    file
  )
  const targetFile = path.resolve(process.cwd(), target)

  return fs.readFile(templateDir, (err, data) => {
    const fileContent = transform(data.toString())

    fs.writeFileSync(targetFile, fileContent)
  });
}

const createFiles = (fileName, options) => {
  const componentFileName = isClassComponent(options.type) ? 'class-component.js' : 'component.js'
  const componentName = toPascalCase(fileName)
  const componentType = getComponentType(options.type)

  try {
    fs.mkdirSync(fileName)

    copyTemplate({
      file: componentFileName,
      target: `${fileName}/${fileName}.js`,
      transform: data => {
        const withComponentName = data.replace(/\$ComponentName/g, componentName)
        return withComponentName.replace(/\$ComponentType/g, componentType)
      }
    })

    copyTemplate({
      file: 'index.js',
      target: `${fileName}/index.js`,
      transform: data => data.replace(/\$fileName/g, fileName)
    })

    copyTemplate({
      file: 'styled-components.js',
      target: `${fileName}/styled-components.js`,
    })

    copyTemplate({
      file: 'component.test.js',
      target: `${fileName}/${fileName}.test.js`,
      transform: data => data.replace(/\$ComponentName/g, componentName)
    })

    return { done: true }
  } catch (e) {
    return { done: false }
  }  
}
export default createFiles
