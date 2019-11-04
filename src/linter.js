/* eslint-disable global-require */
import fs from 'fs';
import findUp from 'find-up';

export const lintFile = (config) => ({ dir, data }) => {
  const { CLIEngine, Linter } = require('eslint');

  const linter = new Linter();
  const cli = new CLIEngine({ baseConfig: config });
  const fileConfig = cli.getConfigForFile(dir);

  const lintedData = linter.verifyAndFix(data, fileConfig);

  return {
    data: lintedData.output,
    dir,
  };
};

export const getEslintConfig = async (option) => {
  const configFile = await findUp(option);
  const file = fs.readFileSync(configFile, 'utf8');
  return JSON.parse(file);
};
