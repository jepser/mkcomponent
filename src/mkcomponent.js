import arg from 'arg'
import chalk from 'chalk'
import { promptForMissingOptions } from './interactive-prompt'
import createFiles from './create-files'

const getComponentType = (options) => {
  switch(true) {
    case options['--pure']:
      return 'pure'
    case options['--class']:
      return 'class'
    case options['--func']:
      return 'func'
    default:
      return ''
  }
}
const parseArgsToOptions = (rawArgs) => {
  const args = arg({
    '--class': Boolean,
    '--pure': Boolean,
    '--func': Boolean,
    '--help': Boolean,
    '-c': '--class',
    '-p': '--pure',
    '-f': '--func'
  }, {
    argv: rawArgs.slice(2),
  })

  return {
    name: args._[0],
    type: getComponentType(args),
    help: args['--help']
  }
}

const mkcomponent = async (args) => {
  const options = parseArgsToOptions(args)

  if(options.help) {
    return console.log(chalk`
  Usage: 
    mkcomponent {bold component-name}

  Params:
    --name: kebab-case component name
    --class: for class component
    --pure: for pure component
    --func: for functional component (default)
    `
    )
  }

  const { name, ...rest } = await promptForMissingOptions(options)

  const result = createFiles(name, rest)
  
  if(result.done) {
    console.log(chalk.green.bold(`Your component "${name}" has been created 🎉`))
  } else {
    console.log(chalk.red(`Ups... "${name}" component couldn't be created 😞`))
  }  
}

export default mkcomponent
