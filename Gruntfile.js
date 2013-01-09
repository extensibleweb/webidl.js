module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: [
          'lib/webidl.js', 
          'lib/interfaces/WebIDL.js', 
          'lib/types/Boolean.js', 
          'lib/types/Date.js',
          'lib/types/DOMString.js',
          'lib/types/Double.js',
          'lib/types/IDLType.js',
          'lib/types/Octet.js'
        ],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },

    linter: {
      files: [ 
          'Gruntfile.js',
          'lib/**/*.js'
      ],
      directives: {
        "proto": false,
        "devel": true,
        "forin": true,
        "noarg": true,
        "noempty": true,
        "eqeqeq": true,
        "bitwise": false,
        "strict": true,
        "undef": true,
        "unused": true,
        "curly": true,
        "browser": true,
        "indent": 2,
        "maxerr": 50,
        "predef":["exports","module","window","require","define"]
      },
      globals: {
          jQuery: true
      },
      options: {
          errorsOnly: true,
          linter: 'deps/jshint.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-linter');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['linter', 'uglify']);

};