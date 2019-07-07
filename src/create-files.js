import fs from 'fs'
import path from 'path'
import toPascalCase from 'to-pascal-case'

import { CLASS_COMPONENT_TYPE, PURE_COMPONENT_TYPE } from './constants'

export const isClassComponent = (type) => ['class', 'pure'].includes(type) ? type : false
export const getComponentType = type => type === 'pure' ? PURE_COMPONENT_TYPE : CLASS_COMPONENT_TYPE

export const copyTemplate = ({ file, target, transform = i => i }) => {

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

export const getFilesToBeCreated = (fileName, options) => {
  const componentFileName = isClassComponent(options.type) ? 'class-component.js' : 'component.js'
  const componentName = toPascalCase(fileName)
  const componentType = getComponentType(options.type)

  const templates = [
    {
      file: componentFileName,
      target: `${fileName}/${fileName}.js`,
      transform: data => {
        const withComponentName = data.replace(/\$ComponentName/g, componentName)
        return withComponentName.replace(/\$ComponentType/g, componentType)
      }
    },
    {
      file: 'index.js',
      target: `${fileName}/index.js`,
      transform: data => data.replace(/\$fileName/g, fileName)
    }
  ]

  if(options.withTest) {
    templates.push({
      file: 'component.test.js',
      target: `${fileName}/${fileName}.${options.testSuffix}.js`,
      transform: data => data.replace(/\$ComponentName/g, componentName)
    })
  }

  if(options.withStyled) {
    templates.push({
      file: 'styled-components.js',
      target: `${fileName}/styled-components.js`,
    })
  }

  return templates
}

const createFiles = (fileName, options) => {
  const files = getFilesToBeCreated(fileName, options)
  try {
    fs.mkdirSync(fileName)

    files.forEach(copyTemplate)

    return { done: true }
  } catch (e) {
    return { done: false }
  }  
}

export default createFiles
