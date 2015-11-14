var path = require('path');
var StaticReactSource = require('./StaticReactSource');

/**
 * Plugin to create static HTML from JSX.
 *
 * @param {object} [props] - Component properties.
 * @param {object} [options] - Miscellaneous options.
 */
function StaticJsxPlugin() {}

StaticJsxPlugin.prototype.apply = function(compiler) {

  compiler.plugin('this-compilation', function(compilation) {
    compilation.plugin('additional-chunk-assets', function additionalChunkAssets() {

      if (this.errors && this.errors.length) return this.errors;

      var entry = compilation.compiler.options.entry;

      if (Array.isArray(entry)) {
        throw new Error('unsupported entry type: Array');
      } else if (typeof entry === 'string') {
        if (path.extname(entry) === '.jsx') {
          addStaticReactAsset('main');
        } else {
          throw new Error('unspported file extension ' + path.extname(entry));
        }
      } else if (typeof entry === 'object') {
        Object.getOwnPropertyNames(entry).forEach(function(name) {
          addStaticReactAsset(name);
        });
      } else {
        throw new Error('unsupported entry type: ' + typeof entry);
      }

      function addStaticReactAsset(name) {
        var chunk = compilation.namedChunks[name];

        if (!chunk) {
          throw new Error('No such chunk: ' + name);
        }

        var filePath = compilation.getPath(name + '.html', {
          chunk: chunk
        });
        chunk.files.push(filePath);

        var source = new StaticReactSource(chunk, compilation);
        compilation.additionalChunkAssets.push(filePath);
        compilation.assets[filePath] = source;
      }
    });
  });
}

module.exports = StaticJsxPlugin;
