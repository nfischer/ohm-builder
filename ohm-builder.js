#!/usr/bin/env node
var shell = require('shelljs');
var path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: ' + path.basename(process.argv[1]) + ' <inputFile>');
  console.error('  or   ' + path.basename(process.argv[1]) + ' <inputFile> <html_output>');
  process.exit(1);
}

var inputFile = process.argv[2];
var outputFile = process.argv[3];

if (inputFile === outputFile) {
  console.error('Must provide different file names');
  process.exit(2);
}

var contents = shell.cat(inputFile).toString();
var jsdom = require('jsdom');
var doc = jsdom.jsdom(contents);
var window = doc.defaultView;
var $ = require('jquery')(window);
var sourceDir = path.dirname(outputFile || inputFile);
$('script[type="text/ohm-js"]').each(function (_, b) {
  var node = $(b);
  var fname = node.attr('src');
  var grammarContents = shell.cat(path.join(sourceDir, fname));
  node.text('\n' + grammarContents); // prefix with whitespace
  node.removeAttr('src');
});

var output = jsdom.serializeDocument(doc);

if (outputFile)
  (new shell.ShellString(output)).to(outputFile);
else
  console.log(output);

console.warn('Success!');
