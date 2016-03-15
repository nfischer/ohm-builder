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
  if (actual !== cat('index.html')+'\n') {
    console.error('** Test failed!');
    ret = 1;
  }
  cd('-');
});

exit(ret);
