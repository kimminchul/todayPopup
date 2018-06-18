module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './public/',
                    keepalive:true,
                }
            }
        },

        uglify: {
            target: {
              files: {
                  './public/assets/js/todaypopup.min.js': ['./src/assets/js/todaypopup.js']
              }
            }
        },

        less:{
            development: {
                options: {
                    paths: ['assets/less']
                },
                files: {
                    './public/assets/css/style.css': './src/assets/less/import.less'
                }
            },
        },
        copy: {
          html: {
            files: [
                // includes files within path
                {expand: true, flatten: true, src: ['./src/view/*.html'], dest: './public/view', filter: 'isFile'}
            ],
          },
          libs:{
              files:[
                  {expand: true, flatten: true, src: ['./src/libaray/**'], dest: './public/library', filter: 'isFile'}
              ]
          },
          images:{
              files:[
                  {expand: true, flatten: true, src: ['./src/assets/images/**'], dest: './public/assets/images', filter: 'isFile'}
              ]
          }
        },

        watch: {
            less: {
                files: ['./src/assets/less/**/*'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
            copy:{
                files: ['./src/view/*.html','./src/libaray/*','./src/assets/images/*'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                }
            },
            uglify: {
                files: ['./src/assets/js/todaypopup.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            }
        }//watch
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Default task(s).
    grunt.registerTask('default', ['connect']);

};
