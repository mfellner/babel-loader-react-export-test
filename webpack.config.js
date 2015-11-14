module.exports = {
  entry: {
    "module-exports": "./module-exports.js",
    "export-default": "./export-default.js"
  },
  output: {
    path: 'dist',
    filename: '[name].bundle.js'
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
