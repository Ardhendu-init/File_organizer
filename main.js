const prompt = require("prompt-sync")({ sigint: true });
const command = prompt("What you want to do ? organize/tree/help ");
const fs = require("fs");
const path = require("path");
let types = require("./utility");
// let types = {
//   media: ["mp4", "mkv", "mp3"],
//   archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
//   documents: [
//     "docx",
//     "doc",
//     "pdf",
//     "xlsx",
//     "xls",
//     "odt",
//     "ods",
//     "odp",
//     "odg",
//     "odf",
//     "txt",
//     "ps",
//     "tex",
//     "pptx",
//     "txt",
//   ],
//   app: ["exe", "dmg", "pkg", "deb"],
//   photo: ["jpg", "jpeg", "png"],
// };

switch (command) {
  case "tree":
    const path_tree = prompt("Tell the Directory Path :- ");
    treeFn(path_tree);
    break;
  case "organize":
    const path_organize = prompt("Tell the Directory Path :- ");
    organizeFn(path_organize);
    break;
  case "help":
    helpFn();
    break;

  default:
    console.log("Please enter right value");
    break;
}
function helpFn() {
  console.log(`
    List of All the commands:
                tree --> "directoryPath"
                organize--> "directoryPath"
                help
                `);
}
function treeFn(dirPath) {
  console.log("In tree");
}
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
      console.log(category);
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
