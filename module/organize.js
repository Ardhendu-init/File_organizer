const fs = require("fs");
const path = require("path");
const types = require("../utility");

function organizeFn(dirPath) {
  let destPath;
  if (dirPath == undefined) {
    console.log("Kindly enter a path");
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      destPath = path.join(dirPath, "Organised_Files");
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("Kindly enter a right path");
      return;
    }
  }
  organizeHelper(dirPath, destPath);
}
function organizeHelper(src, dest) {
  let child_names = fs.readdirSync(src); //give all the files/folder name in the destination directory
  for (let i = 0; i < child_names.length; i++) {
    let child_address = path.join(src, child_names[i]); //to get the file/folder address
    let is_file = fs.lstatSync(child_address).isFile();
    if (is_file) {
      let category = getCategory(child_names[i]);
      // console.log(category);
      sendFiles(child_address, dest, category);
    }
  }
}
function getCategory(name) {
  let ext = path.extname(name);

  ext = ext.slice(1);
  for (let type in types) {
    let cTypeArray = types[type];

    for (let i = 0; i < cTypeArray.length; i++) {
      if (ext === cTypeArray[i]) {
        return type;
      }
    }
  }
  return "others";
}
function sendFiles(srcPath, dest, category) {
  let categoryPath = path.join(dest, category);
  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath); //making category wise folder if doesn't allready exsist
  }
  let filename = path.basename(srcPath); //get the file name
  let destPath = path.join(categoryPath, filename); //creating destination path for the file
  fs.copyFileSync(srcPath, destPath); //copy file from source to destination
  fs.unlinkSync(srcPath); //removing copied file from source
  console.log(filename, "copied to ", category);
}
module.exports = organizeFn;
