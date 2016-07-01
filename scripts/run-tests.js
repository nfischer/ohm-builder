#!/usr/bin/env node

var shell = require('shelljs');
var path = require('path');
var assert = require('assert');

// Setupt
shell.cd('test');
var cmd = 'node ../../ohm-builder.js';
var INPUT = 'index.generator.html';
var OUTPUT = 'index.html';
shell.config.silent = true;

// Invalids

var result = shell.exec('node ../ohm-builder'); // no args
assert.strictEqual(result.code, 1);
assert.strictEqual(result.stdout, '');
assert.ok(result.stderr);

result = shell.exec('node ../ohm-builder foo foo'); // same arg
assert.strictEqual(result.code, 2);
assert.strictEqual(result.stdout, '');
assert.ok(result.stderr);

// Valids

var ret = 0;
shell.ls('.').forEach(function (d) {
  shell.echo('Running test: ' + d);
  shell.cd(d);
  var inputFile = shell.test('-f', INPUT) ? INPUT : path.join(shell.ls('-d', '*/')[0], INPUT);
  var outputFile = shell.test('-f', INPUT) ? OUTPUT : path.join(shell.ls('-d', '*/')[0], OUTPUT);
  var actual = shell.exec(cmd + ' ' + inputFile).stdout;
  var expected = shell.cat(outputFile).toString();
  /* istanbul ignore next */
  if (actual !== expected) {
    console.error('** Test failed!');
    console.error('expected: '+JSON.stringify(expected));
    console.error('actual:   '+JSON.stringify(actual));
    ret = 1;
  }
  shell.cd('-');
});

process.exit(ret);
