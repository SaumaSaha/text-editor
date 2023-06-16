const fs = require("fs");
const { InsertModeController } = require("./src/insert-mode-controller");
const { InputController } = require("./src/key-board-controller");
const { Buffer } = require("./src/buffer");
const { NormalModeController } = require("./src/normal-node-controller");
const { EditorController } = require("./src/editor-controller");

const renderer = (data, mode) => {
  console.clear();
  process.stdout.write(mode + " MODE\n");
  process.stdout.write(data);
};

const main = () => {
  const fileName = process.argv[2];
  const buffer = new Buffer();
  const keyboardController = new InputController(process.stdin);
  const insertModeController = new InsertModeController(
    keyboardController,
    renderer
  );

  const normalModeController = new NormalModeController(
    keyboardController,
    renderer
  );

  const editorArgs = {
    modeControllers: [normalModeController, insertModeController],
    keyboardController,
    fs,
    buffer,
    fileName,
  };

  const editorController = new EditorController(editorArgs);

  editorController.start();
};

main();
