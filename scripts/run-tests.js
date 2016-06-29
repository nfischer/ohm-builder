#!/usr/bin/env node

var shell = require('shelljs');
var path = require('path');

shell.cd('test');

var cmd = 'node ../../ohm-builder.js';
var ret = 0;
var INPUT = 'index.generator.html';
var OUTPUT = 'index.html';
shell.config.silent = true;
shell.ls('.').forEach(function (d) {
  shell.echo('Running test: ' + d);
  shell.cd(d);
  var inputFile = shell.test('-f', INPUT) ? INPUT : path.join(shell.ls('-d', '*/')[0], INPUT);
  var outputFile = shell.test('-f', INPUT) ? OUTPUT : path.join(shell.ls('-d', '*/')[0], OUTPUT);
  var actual = shell.exec(cmd + ' ' + inputFile).stdout;
  var expected = shell.cat(outputFile).toString();
  if (actual !== expected) {
    console.error('** Test failed!');
    console.error('expected: '+JSON.stringify(expected));
    console.error('actual:   '+JSON.stringify(actual));
    ret = 1;
  }
  shell.cd('-');
});

process.exit(ret);
