module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      customJs: {
        expand: true,
        cwd: 'js/',
        src: [
          '**/*.js'
        ],
        dest: 'build/js'
      },
      customMedia: {
        expand: true,
        cwd: 'media/',
        src: [
          '**/*'
        ],
        dest: 'build/media'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: [
          'jquery.min.js'
        ],
        dest: 'build/js'
      },
      bootstrapJs: {
        expand: true,
        cwd: 'node_modules/bootstrap/',
        src: [
          'js/modal.js',
          'js/transition.js'
        ],
        dest: 'build/'
      },
      bootstrapCss: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: [
          'css/bootstrap.min.css'
        ],
        dest: 'build/'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: 'build/'
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
        files: [{
          expand: true,
          ext: '.html',
          cwd: 'pug/',
          src: [
            '**/*.pug'
          ],
          dest: 'build/'
        }]
      }
    },

    sass: {
      options: {
        sourceMap: false,
        sourceComments: true
      },
      compile: {
        files: {
            'build/css/main.css': 'sass/main.scss'
        }
      }
    },

    watch: {
      src: {
        files: ['pug/**/*.pug', 'js/**/*.js', 'sass/**/*.scss'],
        tasks: ['sass', 'pug', 'copy:customJs', 'copy:customMedia'],
        options: {
          livereload: true
        }
      }
    }

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

  grunt.registerTask('default', ['sass', 'copy', 'pug', 'connect', 'watch']);
};
