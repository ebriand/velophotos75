import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const { ProvidePlugin, NoErrorsPlugin, EnvironmentPlugin
  , optimize: { DedupePlugin, OccurrenceOrderPlugin, UglifyJsPlugin } } = webpack
const backendPort = process.env.PORT || 9000
const prod = (process.env.NODE_ENV === 'production')
const projectRoot = path.join(__dirname, '..')

function getPlugins() {
  const plugins = []
  if (prod) {
    plugins.push(new NoErrorsPlugin())
    plugins.push(new DedupePlugin())
    plugins.push(new OccurrenceOrderPlugin())
    plugins.push(new UglifyJsPlugin({ compress: { warnings: false } }))
    plugins.push(new EnvironmentPlugin(['NODE_ENV']))
  }
  plugins.push(new ProvidePlugin({ jQuery: 'jquery', $: 'jquery', 'window.jQuery': 'jquery', _: 'lodash' }))
  plugins.push(new HtmlWebpackPlugin({ template: 'src/public/index.html', inject: 'body' }))
  return plugins
}

function devServer() {
  return {
    contentBase: './public/',
    stats: { colors: true },
    'history-api-fallback': true,
    progress: true,
    host: '0.0.0.0',
    inline: true,
    watchOptions: { poll: true },
    proxy: {
      '/api/**': { target: `http://localhost:${backendPort}` },
    },
  }
}

export default {
  entry: path.resolve(projectRoot, 'src/public/index.jsx'),
  output: {
    path: path.join(projectRoot, 'dist/public'),
    publicPath: prod ? 'public/' : '',
    filename: '[hash].js',
  },
  devtool: prod ? '' : 'eval-source-map',
  devServer: prod ? undefined : devServer(),
  plugins: getPlugins(),
  resolve: {
    root: [path.resolve('./src/public'), path.resolve('./src/public/components')],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /index.html$/, loader: 'html' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jsx$/, loaders: ['babel', 'eslint'], exclude: [/node_modules/, /webpack-dev-server.js$/] },
      { test: /\.(png|svg|gif|jpe?g|eot|woff|ttf|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'file' },
    ],
  },
}
