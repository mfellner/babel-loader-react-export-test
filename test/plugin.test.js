var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var webpack = require('webpack');
var config = require('../webpack.plugin.config.js');

var chai = require('chai');
var expect = chai.expect;

describe('StaticJsxPlugin', function() {
  afterEach(function(done) {
    rimraf(path.join(__dirname, '../dist/plugin'), done);
  });

  it('should export static html with module.exports', function(done) {
    config.entry = './src/module-exports.jsx';
    webpack(config).run(function(err, stats) {
      if (err) {
        return done(err);
      }
      if (stats.compilation.errors.length) {
        return done(stats.compilation.errors[0]);
      }

      fs.readFile(path.join(__dirname, '../dist/plugin/main.html'), function(err, data) {
        if (err) return done(err);
        expect(data.toString()).to.equal('<html lang="en"><body><h1>no message provided</h1></body></html>');
      })
      done();
    });
  });

  it('should export static html with export default', function(done) {
    config.entry = './src/export-default.jsx';
    webpack(config).run(function(err, stats) {
      if (err) {
        return done(err);
      }
      if (stats.compilation.errors.length) {
        return done(stats.compilation.errors[0]);
      }

      fs.readFile(path.join(__dirname, '../dist/plugin/main.html'), function(err, data) {
        if (err) return done(err);
        expect(data.toString()).to.equal('<html lang="en"><body><h1>no message provided</h1></body></html>');
      })
      done();
    });
  });
});
