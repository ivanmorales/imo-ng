module.exports = (grunt)->

  paths = 
    all: '**/*.'
    sass: './sass/'
    css: './www/css/'
    coffee: './coffee/'
    js: './www/js/'

  config = 
    pkg: grunt.file.readJSON('package.json')

    watch:
      options:
        span: false
        inerrupt: true
        atBegin: true
        interval: 500

      coffee: 
        files: [paths.coffee + paths.all + "coffee"]
        tasks: ['coffee']

      # sass: 
      #   files: [paths.sass + paths.all + "sass"]
      #   task: ['sass']


    # clean:
    #   default:
    #     src: ['#{paths.js %>/*', '<%= paths.css}/']

    compass:
      default:
        options:
          sassDir: paths.sass
          cssDir: paths.css
          httpPath: '/'
          relativeAssets: true
          boring: true
          debugInfo: true
          outputStyle: 'expanded'
          environment: 'development'
          raw: 'preferred_syntax = :sass\n'

    coffee:
      default:
        options:
          bare: true
        files:
          "./www/js/build/build.js": [
            paths.coffee + "hairtypes/*.coffee",
            paths.coffee + "app/*.coffee",
            paths.coffee + "*.coffee"
          ]

  grunt.initConfig(config)

  # Load NPM Tasks
  grunt.loadNpmTasks(task) for task in [
    # 'grunt-contrib-uglify',
    # 'grunt-contrib-clean',
    'grunt-contrib-compass',
    'grunt-contrib-coffee',
    'grunt-contrib-watch',
    'grunt-contrib-sass'
    # 'grunt-contrib-imagemin',
    # 'grunt-contrib-cssmin'
  ]

  grunt.registerTask('default', ['watch'])