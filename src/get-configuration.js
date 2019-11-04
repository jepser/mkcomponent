import readPkgUp from 'read-pkg-up'

const DEFAULT_CONF = {
  withTest: false,
  withStyled: false,
  testSuffix: 'test',
}

const getConfiguration = async () => {
  const packageJson = await readPkgUp()

  if(!packageJson || !packageJson.package.mkcomponent) return DEFAULT_CONF

  return {
    ...DEFAULT_CONF,
    ...packageJson.package.mkcomponent
  }
}

export default getConfiguration
