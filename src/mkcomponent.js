import arg from 'arg';
import chalk from 'chalk';
import { promptForMissingOptions } from './interactive-prompt';
import createFiles from './create-files';
import getConfiguration from './get-configuration';

const getComponentType = (options) => {
  switch (true) {
    case options['--pure']:
      return 'pure';
    case options['--class']:
      return 'class';
    case options['--func']:
      return 'func';
    default:
      return '';
  }
};
const parseArgsToOptions = (rawArgs) => {
  const args = arg({
    '--class': Boolean,
    '--pure': Boolean,
    '--func': Boolean,
    '--help': Boolean,
    '-c': '--class',
    '-p': '--pure',
    '-f': '--func',
  }, {
    argv: rawArgs.slice(2),
  });

  return {
    name: args._[0],
    type: getComponentType(args),
    help: args['--help'],
  };
};

const mkcomponent = async (args) => {
  const options = parseArgsToOptions(args);

  if (options.help) {
    return console.log(chalk`
  Usage: 
    mkcomponent {bold component-name}

  Params:
    --name: kebab-case component name
    --class: for class component
    --pure: for pure component
    --func: for functional component (default)
    `);
  }

  delete options.help;

  const defaultConfiguration = await getConfiguration();
  const { name, ...componentOptions } = await promptForMissingOptions({
    ...defaultConfiguration,
    ...options,
  });

  const result = await createFiles(name, componentOptions);

  if (result.done) {
    console.log(chalk.green.bold(`Your component "${name}" has been created 🎉`));
  } else {
    console.log(chalk.red(`Ups... "${name}" component couldn't be created 😞`));
  }
};

export default mkcomponent;
