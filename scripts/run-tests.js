#!/usr/bin/env node

require('shelljs/global');
var path = require('path');

cd('test');

var cmd = 'node ../../ohm-builder.js';
var ret = 0;
var INPUT = 'index.generator.html';
var OUTPUT = 'index.html';
config.silent = true;
ls('.').forEach(function (d) {
  echo('Running test: ' + d);
  cd(d);
  var inputFile = test('-f', INPUT) ? INPUT : path.join(ls('-d', '*/')[0], INPUT);
  var outputFile = test('-f', INPUT) ? OUTPUT : path.join(ls('-d', '*/')[0], OUTPUT);
  var actual = exec(cmd + ' ' + inputFile).stdout;
  var expected = cat(outputFile).toString();
  if (actual !== expected) {
    console.error('** Test failed!');
    console.error('expected: '+JSON.stringify(expected));
    console.error('actual:   '+JSON.stringify(actual));
    ret = 1;
  }
  cd('-');
});

exit(ret);
