# Ohm-builder

[![Travis](https://img.shields.io/travis/nfischer/ohm-builder/master.svg?style=flat-square&label=Travis)](https://travis-ci.org/nfischer/ohm-builder)
[![AppVeyor](https://img.shields.io/appveyor/ci/shelljs/ohm-builder/master.svg?style=flat-square&label=Appveyor)](https://ci.appveyor.com/project/shelljs/ohm-builder/branch/master)
[![Codecov](https://img.shields.io/codecov/c/github/nfischer/ohm-builder/master.svg?style=flat-square&label=coverage)](https://codecov.io/gh/nfischer/ohm-builder)
[![npm](https://img.shields.io/npm/v/ohm-builder.svg?style=flat-square)](https://www.npmjs.com/package/ohm-builder)

Bring ohm to your browser the easy way.

What's Ohm? [Check it out](https://github.com/cdglabs/ohm).

## Installation

This requires Node v4+

```Bash
$ npm install --save-dev ohm-builder
```

## What's the deal with HTML?

Ohm has steps on [defining your
grammar](https://github.com/cdglabs/ohm#defining-grammars) for *either* the
browser or node, but not both. Don't like having two sets of steps? Keep
reading...

HTML's `<script>` tag only allows you to use the `src=` attribute if you're
using a path to a *javascript* file, not an Ohm grammar. **Let's fix that.**

Now you can write your HTML with script tags like: `<script type="text/ohm-js"
src="src/bash.ohm"></script>`. Run this tool and you can statically generate a
new HTML file with the grammar included.

## Why would I want this?

 - Write your grammar once, use it in both the browser or NodeJS.
 - Re-use [someone else's ohm
   grammar](https://www.npmjs.com/search?q=ohm+grammar) as a simple npm
   dependency.
 - Develop your browser code following the recommended steps on the repo,
   instead of figuring out some messy way to load your grammar in at run-time.
 - Unit testing just got easier! Use NodeJS to run unit tests, even if you're
   developing for a project in the browser.
 - Edit your grammar without dealing with all of the fuss of HTML.

## Ok, so how do I use this?

Try it out as an npm script:

```javascript
// put this in package.json
"scripts": {
  // ...
  "build": "ohm-builder.js src/index.generator.html index.html"
},
```

```bash
$ # Make your edits in src/index.generator.html
$ # Then run this command to build index.html
$ npm run build
```

### Using a watcher (recommended)

If you don't want to constantly reenter that command, check out `watch` to
automatically recompile your project:

```bash
$ npm install --save-dev watch
```

Then, assuming your file is inside `src/`, put this in `package.json`:

```javascript
"scripts": {
  // ...
  "build": "ohm-builder.js src/index.generator.html index.html",
  "build:watch": "watch 'npm run build' src"
},
```
