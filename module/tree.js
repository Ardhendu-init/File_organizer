const fs = require("fs");
const path = require("path");

function treeFn(dirPath) {
  if (dirPath == undefined) {
    console.log("Kindly enter a path");
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      treeHelper(dirPath, " ");
    } else {
      console.log("Kindly enter a right path");
      return;
    }
  }
}
function treeHelper(srcPath, indent) {
  let isFile = fs.lstatSync(srcPath).isFile();
  if (isFile) {
    let fileName = path.basename(srcPath);
    console.log(indent + "├──" + fileName);
  } else {
    let dirName = path.basename(srcPath);
    console.log(indent + "└──" + dirName);
    let childrens = fs.readdirSync(srcPath);
    for (let i = 0; i < childrens.length; i++) {
      let childPath = path.join(srcPath, childrens[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}
module.exports = treeFn;
