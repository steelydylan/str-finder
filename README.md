str-finder
======
Find Strings from specified folder

Download
-----

```
npm instll str-finder
```

Usage
-----

```javascript
var gulp = require("gulp");
var finder = require("str-finder");
var rename = require("gulp-rename");
gulp.task('module_search',function(){
     gulp.src("./moduleid.csv")
          .pipe(finder({dir:"themes",notFoundOnly:false}))
          .pipe(rename({basename:"dist",extname:".csv"}))
          .pipe(gulp.dest("./"));
});

gulp.task('default',['module_search']);
```

Option
-----

*notFoundOnly*

show only strings which couldn't be found in the specific folder.

*dir*

Directory you want to search

*delimiter*

For separating words on the source file.


Source File
-----
```
myworks,topCategoryList,csvEntryBody
```

Output
-----

```
name,path
mywork,not Found
topCategoryList,themes/blog2015/top.html
csvEntryBody,themes/blog2015/test.csv
```


LICENSE
-----

(MIT License)
Copyright (c) 2016 [horicdesign](http://horicdesign.com)
