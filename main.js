const { InsertModeController } = require("./src/insert-mode-controller");
const { InputController } = require("./src/key-board-controller");
const { Buffer, renderer } = require("./src/buffer");
const fs = require("fs");


const keyBindings = {
  "\r": ["new-line", "\n"],
  "\x1B": ["stop", "ESC"],
  "\x7F": ["backspace", "back-space"],
  "\x13": ["save", "save"],
};

const main = () => {
  const fileNameToSave = process.argv[2];
  const buffer = new Buffer();
  const keyBoardController = new InputController(process.stdin, keyBindings);
  const insertModeController = new InsertModeController(
    buffer,
    keyBoardController,
    renderer,
    fs,
    fileNameToSave
  );

  insertModeController.start();
};

main();
