class NormalModeController {
  #kbController;
  #renderer;
  #mode;

  constructor(kbController, renderer) {
    this.#kbController = kbController;
    this.#renderer = renderer;
    this.#mode = "NORMAL";
  }

  name() {
    return this.#mode;
  }

  start(buffer) {
    this.#renderer(buffer.getText(), this.#mode);
    const deleteLine = () => {
      buffer.deleteLine();
      this.#renderer(buffer.getText(), this.#mode);
    };

    const deleteWord = () => {
      buffer.deleteWord();
      this.#renderer(buffer.getText(), this.#mode);
    };

    const quit = () => {
      this.#kbController.stop();
    };

    this.#kbController.on("move-right", () => {
      buffer.moveCursorRight();
      this.#renderer(buffer.getText(), this.#mode);
    });

    this.#kbController.on("move-left", () => {
      buffer.moveCursorLeft();
      this.#renderer(buffer.getText(), this.#mode);
    });

    this.#kbController.on("quit", quit);
    this.#kbController.on("delete-line", deleteLine);
    this.#kbController.on("delete-word", deleteWord);
  }

  stop() {
    this.#kbController.removeAllListeners("delete-line");
    this.#kbController.removeAllListeners("delete-word");
    this.#kbController.removeAllListeners("move-left");
    this.#kbController.removeAllListeners("move-right");
  }
}

exports.NormalModeController = NormalModeController;
