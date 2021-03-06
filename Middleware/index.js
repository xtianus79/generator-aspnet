'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var NamedGenerator = module.exports = function NamedGenerator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
  this.generateTemplateFile(
    'Middleware.cs',
    this.name + '.cs', {
      namespace: 'MyNamespace',
      classname: this.name
    }
  );
};
