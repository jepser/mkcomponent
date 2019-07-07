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
├── index.js # exports the component
├── *component-name*.js # the component implmentation
├── *component-name*.test.js (opt-in with withTest) # tests with enzyme imported
├── *styled-components*.js (opt-in with withStyled) # well... for the styled components
```

## Options
- `--class`: to create a class component
- `--pure`: to create a pure component
- `--func`: (default) to create a functional component
- `--help`: list the options

## Configuration
In the `package.json` of your project you can extend the configuration of the library.

``` js
{
  //...
  "mkcomponent": {
    "withTest": false, // <bool> 
    "withStyled": false, // <bool>
    "testSuffix": "test" // {componentName}.{testSuffix}.js
  }
}
```

## Conventions
- pascal-case for component name
- slug-case for folder and file names

## Roadmap
- Accept eslint configuration from the project so the component has the same configuration
- Have a configuration file depending of the project
- Support React memo
- Support base file for storybook
- Support "simple component" to create a file instead a folder
