import { BannerPlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import fileUrl from 'file-url';

const prod = (process.env.NODE_ENV === 'production');
const projectRoot = path.join(__dirname, '..');

function getFilenameTemplate (resourcePath, absoluteResourcePath) {
  if (prod || !resourcePath.startsWith('./src')) {
    return resourcePath;
  }
  return fileUrl(absoluteResourcePath);
}

export default {
  entry: path.resolve(projectRoot, 'src/server/server.js'),
  target: 'node',
  output: {
    path: path.join(projectRoot, 'dist/server'),
    filename: 'server.js',
    devtoolModuleFilenameTemplate: ({resourcePath, absoluteResourcePath}) => getFilenameTemplate(resourcePath, absoluteResourcePath)
  },
  externals: nodeExternals(),
  plugins: [
    new BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel', 'eslint'] }
    ]
  }
};
