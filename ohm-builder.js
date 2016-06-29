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

var contents = cat(inputFile).toString();
var jsdom = require('jsdom');
var doc = jsdom.jsdom(contents);
var window = doc.defaultView;
var $ = require('jquery')(window);
$('script[type="text/ohm-js"]').each(function (_, b) {
  var node = $(b);
  var fname = node.attr('src');
  var sourceDir = path.dirname(outputFile || inputFile);
  var ohmFile = path.join(sourceDir, fname);
  var grammarContents = cat(ohmFile).trim();
  node.text('\n' + grammarContents + '\n'); // wrap with whitespace
  node.removeAttr('src');
});

var output = jsdom.serializeDocument(doc);

if (outputFile)
  output.to(outputFile);
else
  echo(output);

console.warn('Success!');
