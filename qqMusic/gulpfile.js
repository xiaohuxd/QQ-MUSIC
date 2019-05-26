var gulp =require('gulp'),
watch = require('gulp-watch');

var folder = {
    src:"src/",
    dist:"dist/"
};

var devMod = process.env.NODE_ENV == "development";
//在cmd里面敲入命令  export NODE_ENV=development   设置环境变量
console.log(devMod);

// 压缩html
//gulp中插件应用  下载插件-->取到插件-->应用插件
//npm install gulp-htmlclean --save-dev
var htmlClean = require('gulp-htmlclean');



//压缩图片处理
//npm install gulp-imagemin --save-dev
var imgMin = require('gulp-imagemin');


//压缩js文件
//npm install gulp-uglify --save-dev
var jsUglify = require('gulp-uglify');


//去掉js中的调试语句
//npm install gulp-strip-debug --save-dev
var jsDebug = require('gulp-strip-debug');


//将less转换成css
//npm install gulp-less --save-dev
var less = require('gulp-less');


//压缩css
//npm install gulp-clean--css --save-dev
var cssMin = require('gulp-clean-css');

//自动补齐兼容性前缀
//postcss autoprefixer
var postCss = require('gulp-postcss');
var autoPrefixer = require('autoprefixer');


//开启服务器
//npm install gulp-connect --save-dev
var connect = require('gulp-connect');

//创建一个html的任务    
gulp.task('html',function(){
      //取出src/html下面所有的文件
    var page = gulp.src(folder.src + 'html/*')
               .pipe(connect.reload());       //重新刷新
        if(!devMod){
            page.pipe(htmlClean());
        }
        page.pipe(gulp.dest(folder.dist + 'html/'));     
});

gulp.task('css',function(){
 
  var page = gulp.src(folder.src + 'style/*')
            .pipe(connect.reload())
      .pipe(less())
      .pipe(postCss([autoPrefixer()]));
      if(!devMod){
        page.pipe(cssMin());
      }
      page.pipe(gulp.dest(folder.dist + 'style/'));     
});

gulp.task('js',function(){
 var page = gulp.src(folder.src + 'js/*')
           .pipe(connect.reload());
           if(!devMod){
            page .pipe(jsDebug())
                 .pipe(jsUglify());
           }
          page.pipe(gulp.dest(folder.dist + 'js/'));
});

gulp.task('image',function(){
    
    gulp.src(folder.src + 'img/*')
        .pipe(connect.reload())
        .pipe(imgMin())
        .pipe(gulp.dest(folder.dist + 'img/'));     
  });


gulp.task('server',function(){
    connect.server({
        port:'8888',
        livereload:true
    });
});


gulp.task('watch',function(){
    //监听src/html下面的所有文件，当它一改变，就执行html任务。
 watch(folder.src + 'html/*',gulp.parallel('html'));
 watch(folder.src + 'style/*',gulp.parallel('css'));
 watch(folder.src + 'js/*',gulp.parallel('js'));
 watch(folder.src + 'img/*',gulp.parallel('image'));
});



//默认任务
gulp.task('default',gulp.parallel('html','css','js','image','server','watch'));