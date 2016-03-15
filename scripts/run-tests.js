#!/usr/bin/env node

require('shelljs/global');

cd('test');

var cmd = 'node ../../ohm-build.js';
var ret = 0;

config.silent = true;
ls('.').forEach(function (d) {
  echo('Running test: ' + d);
  cd(d);
  var actual = exec(cmd + ' index.generator.html').stdout;
  var expected = cat('index.html')+'\n';
  if (actual !== expected) {
    console.error('** Test failed!');
    console.error('expected: '+JSON.stringify(expected));
    console.error('actual:   '+JSON.stringify(actual));
    ret = 1;
  }
  cd('-');
});

exit(ret);
