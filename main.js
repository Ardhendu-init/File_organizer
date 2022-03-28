const prompt = require("prompt-sync")({ sigint: true });
const command = prompt("What you want to do ? organize/tree/help ");

const helpFn = require("./module/help");
const organizeFn = require("./module/organize");
const treeFn = require("./module/tree");

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
