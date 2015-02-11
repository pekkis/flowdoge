var webpack = require('webpack');

module.exports = function (grunt) {
    'use strict';
    require('jit-grunt')(grunt);

    grunt.loadNpmTasks('grunt-text-replace');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        'http-server': {

            'dev': {

                // the server root directory
                root: 'web',

                port: 9999,
                // port: function() { return 8282; }

                host: "127.0.0.1",

                cache: 0,
                showDir : true,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: false

            }

        },


        webpack: {

          options: {

            storeStatsTo: "stats",

            entry: "./app.js",
   
            output: {
                path: "web",
                publicPath: "/",
                filename: "app.js",
            },

            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'jsx-loader'
                    },
                    {
                        test: /\.less$/,
                        loader: "style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!less-loader"
                    },
                    {
                        test: /\.(jpe?g|png|gif|svg)$/i,
                        loaders: ['image?optimizationLevel=7&interlaced=true']
                    },
                    {
                        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        loader: "url-loader?limit=10000&mimetype=application/font-woff"
                    },
                    {
                        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        loader: "file-loader"
                    }
                ],
               
            }
          },
          
          dev: {
            progress: true,
            failOnError: false,
            watch: true,
            keepalive: true
          },


          prod: {

            progress: true,
            failOnError: false,
            watch: false,
            keepalive: false,

        
                output: {
                    path: "web",
                    publicPath: "/",
                    filename: "app.[hash].js",
                },
        

            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    'mangle': false,
                    'compress': {
                        dead_code     : false,  // discard unreachable code
                        unsafe        : false, // some unsafe optimizations (see below)
                        unused        : false,  // drop unused variables/functions
                        hoist_vars    : false, // hoist variable declarations
                        side_effects  : false,  // drop side-effect-free statements
                        global_defs   : {}     // glob
                    }
                }),
            ],

            
          }
         
        },

        replace: {
  revision: {
    src: ['web/index.html'],             // source files array (supports minimatch)
    dest: 'web/',             // destination directory or file
    replacements: [
    {
      from: /app(\.[a-z0-9]+)?\.js?/gi,      // regex replacement ('Fooo' to 'Mooo')
      to: 'app.<%= stats.hash %>.js'
    }
    ]
  }
}


        
    });

    grunt.registerTask('default',  ['webpack:prod', 'replace']);
    grunt.registerTask('dev', ['webpack:dev']);

};
