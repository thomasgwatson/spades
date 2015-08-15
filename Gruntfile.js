module.exports = function(grunt) {

  // Project configuration.
  grunt
      .initConfig({
        'git-rev-parse' : {
          build: {
            options: {
              prop: 'git-revision',
              number: 7
            }
          }
        },
        uglify : {
          main : {
            files :
            {
              'build/public/lib/app/clientApp.js' : [ 'build/public/lib/app/clientApp.js' ]
            }
          }
        },
        cssmin : {
          main : {
            files : {
              'build/public/lib/app/app.css' : [ 'public/lib/app/app.css' ]
            }
          }
        },
        react : {
          main : {
            files : {
              'build/public/lib/app/clientApp.js' : [ 'public/lib/app/*.jsx' ]
            }
          }
        },
        copy : {
          main : {
            files : [ {
              expand : true,
              cwd : '.',
              src : [ '**', '!public/lib/app/*.jsx' ],
              dest : 'build/'
            }, ]
          }
        },
        compress : {
          main : {
            options : {
              archive : "dist/spade-client-app-<%= grunt.template.today('UTC:yyyy_mm_dd_HH_MM_ss') %>-<%= grunt.config.get('git-revision') %>.zip"
            },
            files : [ {
              expand : true,
              cwd : 'build/',
              src : [ '**' ],
              dest : ''
            } ]
          }
        },
        clean : [ "build", "dist" ]
      });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-git-rev-parse');
  // Default task(s).
  grunt.registerTask('default', [ 'git-rev-parse', 'clean', 'copy', 'react', 'cssmin', 'uglify',
      'compress' ]);

};