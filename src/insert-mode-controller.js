class InsertModeController {
  #keyBoardController;
  #renderer;
  #mode;

  constructor(keyBoardController, renderer) {
    this.#keyBoardController = keyBoardController;
    this.#renderer = renderer;
    this.#mode = "INSERT";
  }

  start(buffer) {
    this.#renderer(buffer.getText(), this.#mode)
    const writeToBuffer = (char) => {
      buffer.storeText(char);
      this.#renderer(buffer.getText(), this.#mode);
    }

    const addNewLine = (char) => {
      buffer.storeText(char);
      this.#renderer(buffer.getText(), this.#mode);
    }

    const giveBackSpace = () => {
      buffer.removeAlphabet();
      this.#renderer(buffer.getText(), this.#mode);
    }

    this.#keyBoardController.on("buffer-write", writeToBuffer);
    this.#keyBoardController.on("new-line", addNewLine);
    this.#keyBoardController.on("backspace", giveBackSpace);
  }

  stop() {
    this.#keyBoardController.removeAllListeners("buffer-write");
    this.#keyBoardController.removeAllListeners("new-line");
    this.#keyBoardController.removeAllListeners("backspace");
  }
}

exports.InsertModeController = InsertModeController;
