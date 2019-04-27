import inquirer from 'inquirer'
import toSlugCase from 'to-slug-case'

export const promptForMissingOptions = async (options) => {
 
  const questions = []
  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Which is the name of the component?',
    })
  }
 
  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'type',
      choices: [
        {
          name: 'Functional component',
          value: 'func'
        },
        {
          name: 'Class component',
          value: 'class'
        },
        {
          name: 'Pure component',
          value: 'pure'
        }
      ],
      message: 'Which type of component?',
      default: 'func',
    })
  }
   
  const answers = await inquirer.prompt(questions)
  return {
    ...options,
    name: toSlugCase(options.name || answers.name),
    type: options.type || answers.type,
  }
 }
