#!/usr/bin/env node
require('shelljs/global');
var path = require('path');

config.fatal = true;

if (process.argv.length < 3) {
  echo('Usage: ' + path.basename(process.argv[1]) + ' <inputFile>');
  echo('  or   ' + path.basename(process.argv[1]) + ' <inputFile> <html_output>');
  exit(1);
}

var inputFile = process.argv[2];
var outputFile = process.argv[3];

if (inputFile === outputFile) {
  echo('Must provide different file names');
  exit(2);
}

// Replace all ohm tags with inlining the code
var regex = /<script\s+type="text\/ohm-js"\s+src=".*\.ohm"><\/script>/;
var matchStrings = grep(regex, inputFile).trim().split('\n').map(function(x) {
  return x.trim();
}).filter(function (x) {
  if (x) {
    console.warn('ret');
    return x;
  }
});
if (!matchStrings.length) { // try the other order
  regex = /<script\s+src=".*\.ohm"\s+type="text\/ohm-js"><\/script>/;
  matchStrings = grep(regex, inputFile).split('\n').map(function(x) {
    return x.trim();
  });
}
var output = cat(inputFile);
if (!matchStrings.length) {
  console.error('Warn: could not find script tag');
} else {
  matchStrings.forEach(function (matchString) {
    if (!matchString)
      return;
    var sourceDir = path.dirname(outputFile || inputFile);
    var ohmFile = path.join(sourceDir, matchString.match(/src="([^"]+)"/)[1]);
    var ohmGrammar = cat(ohmFile).trim();
    var newTag = matchString
                    .replace(/\s+src="[^"]*"/, '')
                    .replace('></script>', '>\n' + ohmGrammar + '\n</script>');
    output = output.sed(matchString.trim(), newTag.trim());
    if (output.trim() === cat(inputFile).trim()) {
      echo('No replacement was made. Internal error.');
      exit(4);
    }
  });
}

if (outputFile)
  output.to(outputFile);
else
  echo(output);

console.warn('Success!');
