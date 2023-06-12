const fs = require("fs");
const { InsertModeController } = require("./src/insert-mode-controller");
const { InputController } = require("./src/key-board-controller");
const { Buffer } = require("./src/buffer");
const { NormalModeController } = require("./src/normal-node-controller");
const { EditorController } = require("./src/editor-controller");

const keyBindings = {
  "\r": ["new-line", "\n"],
  "\x1B": ["stop", "ESC"],
  "\x7F": ["backspace", "back-space"],
  "\x13": ["save", "save"],
  "\x04": ["delete-line", "deleteLine"],
  "\x17": ["delete-word", "deleteWord"],
  "\x03": ["change-mode", "changeMode"]
};
const renderer = (data, mode) => {
  console.clear();
  process.stdout.write(mode + " MODE\n");
  process.stdout.write(data);
};

const main = () => {
  const fileNameToSave = process.argv[2];
  const buffer = new Buffer();
  const keyBoardController = new InputController(process.stdin, keyBindings);
  const insertModeController = new InsertModeController(
    keyBoardController,
    renderer,
  );

  const normalModeController = new NormalModeController(
    keyBoardController,
    renderer,
  );

  const editorController = new EditorController(
    [normalModeController, insertModeController],
    keyBoardController,
    fs,
    buffer,
    fileNameToSave);

  editorController.start();
};

main();
