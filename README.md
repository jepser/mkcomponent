# mkcomponent
mkcomponent for React components.

## Why?

I created this package to easily create React components, unifying the way we create them with other engineers in my team. This was inspired by @joaojeronimo when we worked at @Typeform.

## Usage

### Using npx
1. Go the directory that you want to create the component and run `npx react-mkcomponent *component-name*`

### Using a pkg manager
1. Install the package globally: `yarn global add react-mkcomponent` or `npm install -g react-mkcomponent`
2. Run `mkcomponent *component-name*` in the folder you want to create the component

## Component structure
``` bash
*component-name*/
├── index.js # exports the componnt
├── *component-name*.js # the component implmentation
├── *component-name*.test.js # tests with enzyme imported
├── *styled-components*.js # well... for the styled components
```

# Options
- `--class`: to create a class component
- `--pure`: to create a pure component
- `--help`: list the options

## Conventions
- pascal-case for component name
- slug-case for folder and file names

## Roadmap
- Accept eslint configuration from the project so the component has the same configuration
- Have a configuration file depending of the project
