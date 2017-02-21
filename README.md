# Hugo Boilerplate

[Hugo](https://gohugo.io/) is a static site generator built with [Go](https://golang.org/).

This is a basic boilerplate to start creating a site with Hugo.

It includes a build pipeline with [Webpack](https://webpack.js.org/):

- Sass files are converted to CSS and augmented with Autoprefixer.
- JavaScript files are processed through Babel with the ES2015 preset.

## Installation

1. [Install Hugo](https://gohugo.io/overview/installing/)
2. [Install Yarn](https://yarnpkg.com/en/docs/install)
3. Install dependencies with `yarn install`

## Usage

### Development

The development pipeline uses Browser-Sync, Webpack and Hugo, through a simple [Gulp](http://gulpjs.com/) task.

To start, just run:

```
yarn run start
```

A server will be started on `localhost:8080`.

### Production

Ready to put in production? Just use:

```
yarn run build
```

And copy the files of the `public` folder on your server, by any means.

## Known issues

- Gulp is not necessary. A simple shell script could replace it easily, but we would lose the portability. For the moment, it's good enough.
- The development pipeline is overly complicated, in my opinion, and not optimized (three watchers, no in-memory assets). A built-in Sass/ES6 pipeline integrated with Hugo would simplify this a lot. See "Rational" in `gulpfile.js`.
