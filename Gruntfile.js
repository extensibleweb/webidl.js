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

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['lib/**/*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'uglify']);

};