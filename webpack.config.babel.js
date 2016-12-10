import backWebpackConfig from './webpack/webpack.config.back.babel'
import fromWebpackConfig from './webpack/webpack.config.front.babel'

function getConfig() {
  if (process.env.NODE_ENV === 'production') {
    return [backWebpackConfig, fromWebpackConfig]
  }
  return process.env.COMPONENT === 'back' ? backWebpackConfig : fromWebpackConfig
}

export default getConfig()
