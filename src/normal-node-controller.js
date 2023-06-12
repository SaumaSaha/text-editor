class NormalModeController {
  #keyBoardController;
  #renderer;
  #mode;

  constructor(keyBoardController, renderer) {
    this.#keyBoardController = keyBoardController;
    this.#renderer = renderer;
    this.#mode = "NORMAL";
  }

  start(buffer) {
    this.#renderer(buffer.getText(), this.#mode)
    const deleteLine = () => {
      buffer.deleteLine();
      this.#renderer(buffer.getText(), this.#mode);
    }

    const deleteWord = () => {
      buffer.deleteWord();
      this.#renderer(buffer.getText(), this.#mode);
    }

    this.#keyBoardController.on("delete-line", deleteLine);
    this.#keyBoardController.on("delete-word", deleteWord);
  }

  stop() {
    this.#keyBoardController.removeAllListeners("delete-line");
    this.#keyBoardController.removeAllListeners("delete-word");
  }
}

exports.NormalModeController = NormalModeController;