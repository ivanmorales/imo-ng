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

      jscoffee: 
        files: [paths.coffee + paths.all + "coffee"]
        tasks: ['coffee']

      # csscompass: 
      #   files: [paths.sass + paths.all + "sass"]
      #   task: ['compass:default']


    # clean:
    #   default:
    #     src: ['#{paths.js %>/*', '<%= paths.css}/']

    compass:
      default:
        options:
          sassDir: "sass"
          cssDir: "www/css"
          imagesDir: "sass/images"
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
    'grunt-contrib-compass'
    'grunt-contrib-coffee'
    'grunt-contrib-watch'
  ]

  grunt.registerTask('default', ['compass', 'coffee'])