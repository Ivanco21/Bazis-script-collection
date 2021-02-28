// скрипт предназначен для пересохранения файлов в новый формат Базиса
//он ничего не делает просто пересохраняет все файлы в папки
// чтобы БМ дал пересохранить, добавляется блок, а потом удаляется, как будто были изменения.

var targetDir = "C:/Users/mne21/Desktop/Dwg_свалка/бмФайлыТест/";

const fs = require("fs");
const path = require("path");

var walkSync = function(dir, filelist) {
  var path = path || require('path');
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
          filelist = walkSync(path.join(dir, file), filelist);
      }
      else {
          filelist.push(path.join(dir, file));
      }
  });
  return filelist;
};

var allFl = walkSync(targetDir);

allFl.forEach(fl => {
  var ext = path.extname(fl);

  if (ext == '.b3d' || ext == '.f3d' || ext == '.fr3d'|| ext == '.ldw'|| 
      ext == '.blf'|| ext == '.bln' || ext == '.bsl'|| ext == '.shn') {
      
      var isLoad = Action.LoadModel(fl);
      if (isLoad) {
        var tempBlock = BeginBlock("Temp");
        EndBlock();
        DeleteObject(tempBlock);
        Action.Commit();
        Action.SaveModel(fl);
      }
      
  }
});

