import fs from 'fs'
import path from 'path'
import toPascalCase from 'to-pascal-case'

import { getEslintConfig, lintFile } from './linter'
import { CLASS_COMPONENT_TYPE, PURE_COMPONENT_TYPE } from './constants'

export const isClassComponent = (type) => ['class', 'pure'].includes(type) ? type : false
export const getComponentType = type => type === 'pure' ? PURE_COMPONENT_TYPE : CLASS_COMPONENT_TYPE

const pipe = (...functors) => input => {
  return functors.reduce((result, functor) => functor(result) , input)
}

export const copyTemplate = ({ file, target, transform = [] }) => {
  
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../templates',
    file
  )
  const targetFile = path.resolve(process.cwd(), target)

  return fs.readFile(templateDir, (err, data) => {
    const fileContent = pipe(...transform)({ dir: templateDir, data: data.toString() })

    fs.writeFileSync(targetFile, fileContent.data)
  });
}

export const getFilesToBeCreated = async (fileName, options) => {
  const componentFileName = isClassComponent(options.type) ? 'class-component.js' : 'component.js'
  const componentName = toPascalCase(fileName)
  const componentType = getComponentType(options.type)

  const eslintConfig = options.eslint ? await getEslintConfig(options.eslint) : {}
  const defaultTransforms = options.eslint ? [lintFile(eslintConfig)] : []
  const templates = [
    {
      file: componentFileName,
      target: `${fileName}/${fileName}.js`,
      transform: [
        ({ data, ...rest }) => {
          const withComponentName = data.replace(/\$ComponentName/g, componentName)
          return {
            data: withComponentName.replace(/\$ComponentType/g, componentType),
            ...rest
          }
        },
        ...defaultTransforms,
      ]
    },
    {
      file: 'index.js',
      target: `${fileName}/index.js`,
      transform: [
        ({ data, ...rest }) => ({
          data: data.replace(/\$fileName/g, fileName),
          ...rest
        }),
        ...defaultTransforms,
      ]
    }
  ]

  if(options.withTest) {
    templates.push({
      file: 'component.test.js',
      target: `${fileName}/${fileName}.${options.testSuffix}.js`,
      transform: [
        ({ data, ...rest }) => ({
          data: data.replace(/\$ComponentName/g, componentName),
          ...rest
        }),
        ...defaultTransforms,
      ]
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

const createFiles = async (fileName, options) => {
  const files = await getFilesToBeCreated(fileName, options)
  try {
    if(!fs.existsSync(fileName)) {
      fs.mkdirSync(fileName)
    }

    files.forEach(copyTemplate)

    return { done: true }
  } catch (e) {
    return { done: false }
  }  
}

export default createFiles
