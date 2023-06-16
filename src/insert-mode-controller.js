class InsertModeController {
  #kbController;
  #renderer;
  #mode;

  constructor(keyBoardController, renderer) {
    this.#kbController = keyBoardController;
    this.#renderer = renderer;
    this.#mode = "INSERT";
  }

  name() {
    return this.#mode;
  }

  start(buffer) {
    this.#renderer(buffer.getText(), this.#mode);
    const writeToBuffer = (char) => {
      buffer.storeText(char);
      this.#renderer(buffer.getText(), this.#mode);
    };

    const addNewLine = (char) => {
      buffer.storeText(char);
      this.#renderer(buffer.getText(), this.#mode);
    };

    const giveBackSpace = () => {
      buffer.removeAlphabet();
      this.#renderer(buffer.getText(), this.#mode);
    };

    this.#kbController.on("move-right", () => {
      buffer.moveCursorRight();
      this.#renderer(buffer.getText(), this.#mode);
    });

    this.#kbController.on("move-left", () => {
      buffer.moveCursorLeft();
      this.#renderer(buffer.getText(), this.#mode);
    });

    this.#kbController.on("buffer-write", writeToBuffer);
    this.#kbController.on("new-line", addNewLine);
    this.#kbController.on("backspace", giveBackSpace);
  }

  stop() {
    this.#kbController.removeAllListeners("buffer-write");
    this.#kbController.removeAllListeners("new-line");
    this.#kbController.removeAllListeners("backspace");
    this.#kbController.removeAllListeners("move-left");
    this.#kbController.removeAllListeners("move-right");
  }
}

exports.InsertModeController = InsertModeController;
