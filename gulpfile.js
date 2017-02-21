const gulp = require('gulp')
const cp = require('child_process')
const browserSync = require('browser-sync').create()

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const browserSyncConfig = {
  server: {
    baseDir: './public'
  },
  files: './public',
  port: 8080,
  logLevel: 'silent',
  open: false
}

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

gulp.task('default', ['serve', 'hugo', 'webpack'])

gulp.task('serve', () => browserSync.init(browserSyncConfig))
gulp.task('hugo', done => spawn(done, 'hugo', '--watch'))
gulp.task('webpack', done => spawn(done, 'webpack', '--watch'))

function spawn (done, bin, ...args) {
  return cp.spawn(bin, args, {stdio: 'inherit'}).on('close', done)
}

// -------------------------------------------------------------
// Rational.
// -------------------------------------------------------------

// Gulp is only acting as a task runner to glue Hugo and Webpack
// through Browser-Sync. Nothing is processed directly by Gulp.
// Maybe we should do that with a shell script instead.

// Gulp starts:
// - a Browser-Sync server
// (who watches for changes in the `public/` folder)
// - and Webpack and Hugo in watch mode.

// Why?
// - Hugo doesn't handle compression and pre-processing.
// - Hugo server is nice, but it uses its own server and render
// in-memory. We can't send assets built outside Hugo to this server.
// - webpack-dev-server uses its own server too, with in memory rendering.
//
// tl;dr: we have two servers which can't speak to each other. :(
//
// That's why we glue both builder with browser-sync.
// Browser-Sync creates a server, watch for changes and reload on its own.
// Instead of using in-memory rendering, we unfortunately need to watch for
// for changes on Hugo and Webpack parts, and render to disk in `public/`.
