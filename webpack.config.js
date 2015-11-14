module.exports = {
  target: 'node',
  entry: {
    "module-exports": "./src/module-exports.js",
    "export-default": "./src/export-default.js"
  },
  output: {
    path: 'dist',
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}
