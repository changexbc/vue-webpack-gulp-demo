var gulp = require('gulp')
var gutil = require("gulp-util")
var gulpSequence = require('gulp-sequence')
var fs = require("fs")
var path = require("path")
var clean = require('gulp-clean')
var colors = require('colors')
var plumber = require('gulp-plumber')
var zip = require('gulp-zip')
var imagemin = require("gulp-imagemin")
var pngquant = require('imagemin-pngquant')
var webpack = require("webpack")
var webpackDevServer = require("webpack-dev-server")
var webpackConfig = require("./webpack.config.js")


var appId = '10000066'
var buildPath = 'build_folder/10000066'
var buildTime = function() {
    var timestamp = new Date().getTime()
    fs.writeFileSync(path.join(__dirname, 'CERT'), '{"lastmodified":"' + timestamp + '"}');
    console.log(colors.green.underline('Timestamp:' + timestamp))
}

gulp.task('clean', function () {
    return gulp.src([buildPath,'build_zip/'+appId+'.zip',path.join(__dirname, '/static')],{read: false})
        .pipe(clean({force: true}))
});
gulp.task('imagemin', function () {
    return gulp.src('./static/*.{png,jpg,jpeg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(buildPath + '/App/static'));
});
gulp.task('movehtml', function() {
    return gulp.src('./*.html')
        .pipe(gulp.dest(buildPath + '/App'));
});
gulp.task('movesingle', function() {
    return gulp.src('./{CERT,package}')
        .pipe(gulp.dest(buildPath));
});
gulp.task('movejs', function() {
    return gulp.src('./static/{*.js,*.js.map}')
        .pipe(gulp.dest(buildPath +'/App/static'));
});
gulp.task('zip', ['movesingle','movehtml','movejs','imagemin'], function() {
    return gulp.src([buildPath +'/**'],{ base: __dirname + '/build_folder' })
        .pipe(zip(appId + '.zip'))
        .pipe(gulp.dest(__dirname+'/build_zip'));
});

// Production build

gulp.task("webpack:prod", ['clean'], function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        new webpack.ProvidePlugin({
            "$": "npm-zepto",
            "Zepto": "npm-zepto",
            "window.Zepto": "npm-zepto",
            "_": "underscore",
            "FastClick": "fastclick"
        }),
        new webpack.DefinePlugin({
            '__DEV__': false,
            '__TEST__': false,
            '__PROD__': true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:prod", err);
        gutil.log("[webpack:prod]", stats.toString({
            colors: true
        }));
        callback();
    });
});


gulp.task("webpack:test", ['clean'], function(callback) {
    buildTime()
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "inline-source-map";
    myConfig.debug = true;
    myConfig.plugins = [
        new webpack.ProvidePlugin({
            "$": "npm-zepto",
            "Zepto": "npm-zepto",
            "window.Zepto": "npm-zepto",
            "_": "underscore",
            "FastClick": "fastclick"
        }),
        new webpack.DefinePlugin({
            '__DEV__': false,
            '__TEST__': true,
            '__PROD__': false,
        })
    ]
    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:test", err);
        // gutil.log("[webpack:test]", stats.toString({
        //     colors: true
        // }));
        callback();
    });
});



gulp.task("webpack-dev-server",function(callback) {
    buildTime()
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "#source-map";
    myConfig.debug = true;
    myConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
    // Start a webpack-dev-server
    new webpackDevServer(webpack(myConfig), {
        hot: true,
        publicPath: myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});



gulp.task("default", ["webpack-dev-server"]);
gulp.task("test", gulpSequence("webpack:test","zip"));
gulp.task("prod", gulpSequence("webpack:prod","zip"));
