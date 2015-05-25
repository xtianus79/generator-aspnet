'use strict';
var util = require('./test-utility');

/*
 * Test for all subgenerators NOT requiring a name argument
 */
<<<<<<< HEAD
describe('Subgenerators without arguments tests', function () {

    describe('aspnet-xtianus:PackageJson', function () {
        util.goCreate('PackageJson');
        util.fileCheck('should create package json file', 'package.json');
    });

    describe('aspnet-xtianus:Gulpfile', function () {
        util.goCreate('Gulpfile');
        util.fileCheck('should create gulp file', 'gulpfile.js');
    });

    describe('aspnet-xtianus:BowerJson', function () {
        util.goCreate('BowerJson');
        util.fileCheck('should create bower file', 'bower.json');
    });

    describe('aspnet-xtianus:Config', function () {
        util.goCreate('Config');
        util.fileCheck('should create config json file', 'config.json');
    });

    describe('aspnet-xtianus:StartupClass', function () {
        util.goCreate('StartupClass');
        util.fileCheck('should create Startup.cs file', 'Startup.cs');
    });
=======
describe('Subgenerators without arguments tests', function() {

  describe('aspnet:PackageJson', function() {
    util.goCreate('PackageJson');
    util.fileCheck('should create package json file', 'package.json');
  });

  describe('aspnet:Gulpfile', function() {
    util.goCreate('Gulpfile');
    util.fileCheck('should create gulp file', 'gulpfile.js');
  });

  describe('aspnet:BowerJson', function() {
    util.goCreate('BowerJson');
    util.fileCheck('should create bower file', 'bower.json');
  });

  describe('aspnet:Config', function() {
    util.goCreate('Config');
    util.fileCheck('should create config json file', 'config.json');
  });

  describe('aspnet:StartupClass', function() {
    util.goCreate('StartupClass');
    util.fileCheck('should create Startup.cs file', 'Startup.cs');
  });

  describe('aspnet:gitignore', function() {
    util.goCreate('gitignore');
    util.fileCheck('should create .gitignore file', '.gitignore');
  });
>>>>>>> upstream/master
});

/*
 * Test for all subgenerators requiring a name argument
 */
describe('Subgenerators with named arguments tests', function() {

<<<<<<< HEAD
    describe('aspnet-xtianus:Class', function () {
        var arg = 'MyClass';
        var filename = 'MyClass.cs';
=======
  describe('aspnet:Class', function() {
    var arg = 'MyClass';
    var filename = 'MyClass.cs';
>>>>>>> upstream/master

    util.goCreateWithArgs('Class', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /[ ]*public[ ]*class[ ]*MyClass/);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:CoffeeScript', function () {
        var arg = 'file';
        var filename = 'file.coffee';
=======
  describe('aspnet:CoffeeScript', function() {
    var arg = 'file';
    var filename = 'file.coffee';
>>>>>>> upstream/master

    util.goCreateWithArgs('CoffeeScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:Gruntfile', function () {
        var arg = 'gruntfile';
        var filename = 'gruntfile.js';
=======
  describe('aspnet:Gruntfile', function() {
    var arg = 'gruntfile';
    var filename = 'gruntfile.js';
>>>>>>> upstream/master

    util.goCreateWithArgs('Gruntfile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:HTMLPage', function () {
        var arg = 'mypage';
        var filename = 'mypage.html';
=======
  describe('aspnet:HTMLPage', function() {
    var arg = 'mypage';
    var filename = 'mypage.html';
>>>>>>> upstream/master

    util.goCreateWithArgs('HTMLPage', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:JavaScript', function () {
        var arg = 'file';
        var filename = 'file.js';
=======
  describe('aspnet:JavaScript', function() {
    var arg = 'file';
    var filename = 'file.js';
>>>>>>> upstream/master

    util.goCreateWithArgs('JavaScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:JSON', function () {
        var arg = 'file';
        var filename = 'file.json';
=======
  describe('aspnet:JSON', function() {
    var arg = 'file';
    var filename = 'file.json';
>>>>>>> upstream/master

    util.goCreateWithArgs('JSON', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:MvcController', function () {
        var arg = 'file';
        var filename = 'file.cs';
=======
  describe('aspnet:MvcController', function() {
    var arg = 'file';
    var filename = 'file.cs';
>>>>>>> upstream/master

    util.goCreateWithArgs('MvcController', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:MvcView', function () {
        var arg = 'file';
        var filename = 'file.cshtml';
=======
  describe('aspnet:MvcView', function() {
    var arg = 'file';
    var filename = 'file.cshtml';
>>>>>>> upstream/master

    util.goCreateWithArgs('MvcView', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:TextFile', function () {
        var arg = 'file';
        var filename = 'file.txt';
=======
  describe('aspnet:TextFile', function() {
    var arg = 'file';
    var filename = 'file.txt';
>>>>>>> upstream/master

    util.goCreateWithArgs('TextFile', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:TypeScript', function () {
        var arg = 'file';
        var filename = 'file.ts';
=======
  describe('aspnet:TypeScript', function() {
    var arg = 'file';
    var filename = 'file.ts';
>>>>>>> upstream/master

    util.goCreateWithArgs('TypeScript', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });

<<<<<<< HEAD
    describe('aspnet-xtianus:WebApiController', function () {
        var arg = 'file';
        var filename = 'file.cs';
=======
  describe('aspnet:WebApiController', function() {
    var arg = 'file';
    var filename = 'file.cs';
>>>>>>> upstream/master

    util.goCreateWithArgs('WebApiController', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);

  });
});
