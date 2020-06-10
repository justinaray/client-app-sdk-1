// Karma configuration

const { getBabelInputPlugin, getBabelOutputPlugin } = require('@rollup/plugin-babel');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/**/*Spec.js', watched: false},
      {pattern: 'src/**/*Spec.ts', watched: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/**/*Spec.js': ['rollup'],
        'src/**/*Spec.ts': ['rollup']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    rollupPreprocessor: {
        plugins: [
            require('@rollup/plugin-commonjs')(),
            require('@rollup/plugin-node-resolve').default({
              extensions: ['.ts', '.js']
            }),
            require('@rollup/plugin-json')(),
            require('@rollup/plugin-babel').default({
              babelHelpers: 'runtime',
              exclude: /node_modules/,
              extensions: ['.js', '.ts'],
              presets: ['@babel/env', '@babel/typescript'],
              plugins: [
                  ['@babel/transform-runtime', { useESModules: false }],
                  '@babel/proposal-class-properties',
                  '@babel/transform-object-assign'
              ]
            })
        ],
        output: {
            format: 'iife',         // Helps prevent naming collisions.
            name: 'sdkTestBundle', // Required for 'iife' format.
            sourcemap: 'inline'     // Sensible for testing.
        }
    }
  });
};
