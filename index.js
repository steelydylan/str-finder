var through  = require('through2');
var gutil = require('gulp-util');
var find = require('findit');
var Promise = require('promise');
var fs = require('fs');
var extend = require('extend');
var defs = {
     dir:"/",
     delimiter:",",
     notFoundOnly:false
}
module.exports = function(opt){
     opt = extend({},defs,opt);
     var finderEnd = function(callback){
          return new Promise(function(resolve,reject){
               var finder = find(opt.dir);
               var files = [];
               console.log("scan");
               finder.on('file',function(path,stat){
                    console.log(path);
                    files.push(path);
               });
               finder.on('end',function() {
                    resolve(files);
               });
          }).nodeify(callback);
     };
     var getFileInfo = Promise.denodeify(finderEnd);
     var func = function(file,enc,cb){
          var content = file.contents.toString();
          var arr = content.split(opt.delimiter);
          var exp = "name,path\n";
          var infos = [];
          var that = this;
          getFileInfo().then(function(fileInfo){
               for(var i = 0,n = fileInfo.length; i < n; i++){
                    var path = fileInfo[i];
                    var name = fs.readFileSync(path,'utf8');
                    infos.push({path:path,name:name});
               }
               for(var t = 0,m = arr.length; t < m; t++){
                    var item = arr[t];
                    var flag = false;
                    for(var j = 0,l = infos.length; j < l; j++){
                         var name = infos[j].name;
                         var path = infos[j].path;
                         if(name.indexOf(item) != -1){
                              if(!opt.notFoundOnly){
                                   exp += item+","+path+"\n";
                              }
                              flag = true;
                         }
                    }
                    if(!flag){
                         exp += item+",not Found\n";
                    }
               }
               file.contents = new Buffer(exp);
               that.push(file)
               cb();
          });
     }
     return through.obj(func);
}