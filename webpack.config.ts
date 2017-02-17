// tslint:disable no-var-requires
const path = require('path')

module.exports = {
  entry: {
    tisane: './lib/index.js',
  },
  output: {
    filename: '[name].js',
    library: 'tisane',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
}
