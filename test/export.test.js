var webpack = require('webpack');
var config = require('../webpack.config.js');

var chai = require('chai');
var expect = chai.expect;

describe('babel-loader', function() {
  it('should export static html with module.exports', function(done) {
    webpack(config).run(function(err, stats) {
      if (err) {
        return done(err);
      }
      if (stats.compilation.errors.length) {
        return done(stats.compilation.errors[0]);
      }

      var html = require('../dist/module-exports.bundle.js').html;
      expect(html).to.equal('<html lang="en"><body><h1>Hello, module-exports</h1></body></html>');

      done();
    });
  });

  it('should export static html with export default', function(done) {
    webpack(config).run(function(err, stats) {
      if (err) {
        return done(err);
      }
      if (stats.compilation.errors.length) {
        return done(stats.compilation.errors[0]);
      }

      var html = require('../dist/export-default.bundle.js').html;
      expect(html).to.equal('<html lang="en"><body><h1>Hello, export-default</h1></body></html>');

      done();
    });
  });
});
