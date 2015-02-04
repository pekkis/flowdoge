var webpack = require('webpack');

module.exports = function (grunt) {
    'use strict';
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webpack: {

          options: {

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
         
        }
        
    });

    grunt.registerTask('default', ['webpack:prod']);
    grunt.registerTask('dev', ['webpack:dev']);

};
