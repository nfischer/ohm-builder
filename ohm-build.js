#!/usr/bin/env node
require('shelljs/global');
var xpath = require('xpath');
var xmldom = require('xmldom');

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

var parserArgs = {
  errorHandler:{} // silence error messages
};
var doc = new xmldom.DOMParser(parserArgs).parseFromString(cat(inputFile));

var nodes = xpath.select('//script[@src]', doc);

nodes.forEach(function (node) {
  if (node.getAttribute('src').match(/\.ohm/i)) {
    var fname = node.getAttribute('src');
    node.unsafeTextContent = '\n' + cat(path.join(path.dirname(inputFile), fname)).trim() + '\n';
    node.removeAttribute('src');
  }
});

var output = (new xmldom.XMLSerializer).serializeToString(doc, null, true);
if (output.trim() === cat(inputFile).trim()) {
  echo('No replacement was made. Internal error.');
  exit(4);
}

if (outputFile)
  (output+'\n').to(outputFile);
else
  echo(output);
