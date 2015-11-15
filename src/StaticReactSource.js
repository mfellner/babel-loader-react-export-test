var vm = require('vm');
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Source = require('webpack/lib/Source');

/**
 * Webpack source for React JSX.
 * @class
 * @augments Source
 * @param {Chunk} sourceChunk
 * @param {Compilation} compilation
 */
function StaticReactSource(sourceChunk, compilation) {
  this.sourceChunk = sourceChunk;
  this.compilation = compilation;
  this.externals = Object.freeze(compilation.compiler.options.externals || {});
}

StaticReactSource.prototype = Object.create(Source.prototype);
StaticReactSource.prototype.constructor = StaticReactSource;

StaticReactSource.prototype.source = function() {
  var self = this;

  /**
   * Compile the source chunk to a vm.Script.
   * @return {Script} Compiled script.
   */
  function compile() {
    var source = self.compilation.mainTemplate
      .render(self.compilation.hash,
        self.sourceChunk,
        self.compilation.moduleTemplate,
        self.compilation.dependencyTemplates);

    return new vm.Script(source.source(), {
      displayErrors: true
    });
  }

  /**
   * Create a new vm.Context.
   * @return {Context} Contextified sandbox.
   */
  function createContext() {
    var sandbox = Object.keys(self.externals).reduce(function(obj, k) {
      obj[self.externals[k]] = require(k);
      return obj;
    }, {});

    return vm.createContext(sandbox);
  }

  var script = compile();
  var context = createContext();
  var result = script.runInContext(context);
  // exports.default or module.exports
  var reactClass = result.default || result;
  var Component = React.createFactory(reactClass);
  var html = ReactDOMServer.renderToStaticMarkup(Component());

  return html;
};

module.exports = StaticReactSource;
