var JS_SOURCE = "../js";
var JS_TARGET = "../../public/js";

var CSS_SOURCE = "../style";
var CSS_TARGET = "../../public/style";

//
console.log("\nloading dependencies...");
    var walk = require("walk"),
        _ = require("underscore"),
        browserify = require("browserify"),
        babelify = require("babelify"),
        es2015 = require("babel-preset-es2015"),
        react = require("babel-preset-react"),
        uglify = require("uglifyify"),
        sass = require('gulp-sass'),
        gulp = require("gulp"),
        rename = require("gulp-rename"),
        source = require("vinyl-source-stream");
console.log("dependencies loaded");

console.log("\nloading sources...");
        var sources = [];
        walk.walkSync(
          JS_SOURCE,
          {
            followLinks:false,
            listeners:{
              file: function(dir,stat,next) {
                  if(dir===JS_SOURCE)
                  {
                      sources.push({
                        file: stat.name,
                        name: stat.name.substring(0,stat.name.lastIndexOf(".")),
                        ext: stat.name.substring(stat.name.lastIndexOf("."))
                      });
                      console.log("   working with "+ stat.name);
                  }
                  next();
              }
            }
          });

          gulp.task("build_js",function(){
              _.each(sources,function(src){
                browserify()
                    .add(JS_SOURCE+"/"+src.file)
                    .transform(babelify,{presets:[es2015,react]})
                    .transform(uglify)
                    .bundle()
                    .pipe(source(src.name+".min.js"))
                    .pipe(gulp.dest(JS_TARGET));
              });
          });

          gulp.task('build_css', function () {
            gulp.src(CSS_SOURCE+"/*.scss")
              .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
              .pipe(rename({extname: ".min.css"}))
              .pipe(gulp.dest(CSS_TARGET));
          });
console.log("sources loaded\n");

console.log("\nrunning taks...");
          gulp.task("watch_js",["build_js"],function(){
              gulp.watch([ JS_SOURCE+"/*", JS_SOURCE+"/*/*" ],
              ["build_js"]);
          });

          gulp.task("watch_css",["build_css"],function(){
              gulp.watch([ CSS_SOURCE+"/*", CSS_SOURCE+"/*/*" ],
              ["build_css"]);
          });

          gulp.task("default",["watch_js","watch_css"]);
