# Ohm-builder

[![Build Status](https://travis-ci.org/nfischer/ohm-builder.svg?branch=master)](https://travis-ci.org/nfischer/ohm-builder)
[![Build status](https://ci.appveyor.com/api/projects/status/94si31343bhm82f5/branch/master?svg=true)](https://ci.appveyor.com/project/shelljs/ohm-builder/branch/master)

Bring ohm to your browser the easy way.

What's Ohm? [Check it out](https://github.com/cdglabs/ohm).

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

```Bash
# read in your HTML input (that uses <script src="grammar.ohm">)
# write out fresh HTML output that includes your grammar
$ ohm-builder.js path/to/input-file.html path/to/output-file.html
```

`output-file.html` is your new HTML file, compatible with the browser of your
choice.

**But what if I don't want to type that ugly command all the time?**

Me neither. That's why I use task runners like [gulp](http://gulpjs.com/) to do
it for me. Check out [my
gulpfile](https://github.com/nfischer/BashToShellJS/blob/master/gulpfile.js) to
see how it's done.

## Installation

Install this from the git repo with:

```Bash
$ npm install github:nfischer/ohm-builder
```

Or you can use it as a package dependency:

```javascript
// Inside package.json
"dependencies": {
  "ohm-builder": "github:nfischer/ohm-builder"
},
```
