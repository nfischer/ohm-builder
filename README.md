# Ohm-build

Bring ohm to your browser the easy way.

What's Ohm? [Check it out](https://github.com/cdglabs/ohm).

## What's the deal with HTML?

Ohm has steps on [defining your
grammar](https://github.com/cdglabs/ohm#defining-grammars) for *either* the
browser or node. *Why not both at the same time?*

HTML's `<script>` tag only allows you to use the `src=` attribute to specify a
*javascript* file path, not a `.ohm` file path. This means it was hard to write
a separate `.ohm` grammar file and embed it inside an HTML page... **until now.**

Now you can write your HTML with script tags like: `<script type="text/ohm-js"
src="src/bash.ohm"></script>`, and this tool will statically generate a similar
HTML file that inserts the file contents for you.

## Why would I want this?

 - Write your grammar once, use it in both the browser or NodeJS.
 - Re-use [someone else's ohm
   grammar](https://www.npmjs.com/search?q=ohm+grammar) as a simple npm
   dependency.
 - Develop your browser code following the recommended steps on the repo,
   instead of figuring out some messy way to load your grammar in at run-time.
 - Unit testing just got easier! Use NodeJS to run unit tests, even if you're
   developing for a project in the browser.

## Ok, so how do I use this?

```Bash
# read in your HTML input (that uses <script src="grammar.ohm">)
# write out fresh HTML output that includes your grammar
$ ohm-build.js path/to/input-file.html path/to/output-file.html
```

**But what if I don't want to type that ugly command all the time?**

Me neither. That's why I use task runners like [gulp](http://gulpjs.com/) to do
it for me. Check out [my
gulpfile](https://github.com/nfischer/BashToShellJS/blob/master/gulpfile.js) to
see how it's done.
