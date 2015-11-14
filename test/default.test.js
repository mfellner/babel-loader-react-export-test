var path = require('path');
var rimraf = require('rimraf');
var webpack = require('webpack');
var config = require('../webpack.default.config.js');

var chai = require('chai');
var expect = chai.expect;

describe('babel-loader', function() {
  afterEach(function(done) {
    rimraf(path.join(__dirname, '../dist/default'), done);
  });

  it('should export static html with module.exports', function(done) {
    config.entry = {'module-exports': './src/module-exports.js'};
    webpack(config).run(function(err, stats) {
      if (err) {
        return done(err);
      }
      if (stats.compilation.errors.length) {
        return done(stats.compilation.errors[0]);
      }

      var html = require('../dist/default/module-exports.bundle.js').html;
      expect(html).to.equal('<html lang="en"><body><h1>Hello, module-exports</h1></body></html>');

      done();
    });
  });

  it('should export static html with export default', function(done) {
    config.entry = {'export-default': './src/export-default.js'};
    webpack(config).run(function(err, stats) {
      if (err) {
        return done(err);
      }
      if (stats.compilation.errors.length) {
        return done(stats.compilation.errors[0]);
      }

      var html = require('../dist/default/export-default.bundle.js').html;
      expect(html).to.equal('<html lang="en"><body><h1>Hello, export-default</h1></body></html>');

      done();
    });
  });
});
