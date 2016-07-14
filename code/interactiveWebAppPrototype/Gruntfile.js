module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: [
          'jquery.min.js'
        ],
        dest: './js'
      },
      bootstrapJs: {
        expand: true,
        cwd: 'node_modules/bootstrap/',
        src: [
          'js/collapse.js',
          'js/transition.js'
        ],
        dest: './'
      },
      bootstrapCss: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: [
          'css/bootstrap.min.css'
        ],
        dest: './'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    pug: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          'index.html': ['index.pug']
        }
      }
    },

    watch: {
      src: {
        files: ['*.pug'],
        tasks: ['pug'],
        options: {
          livereload: true
        }
      }
    },

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  grunt.registerTask('default', ['copy', 'pug', 'connect', 'watch']);
};
