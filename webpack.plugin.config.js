var StaticJsxPlugin = require('./src/StaticJsxPlugin');

module.exports = {
  entry: {
    "module-exports": "./src/module-exports.jsx",
    "export-default": "./src/export-default.jsx"
  },
  output: {
    path: 'dist/plugin/',
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
  },
  plugins: [new StaticJsxPlugin()]
}
