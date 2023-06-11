class BufferController {
  #buffer;
  #keyBoardController;
  #renderer;
  #fileName;
  #writer

  constructor(buffer, keyBoardController, renderer, writer, fileName = "demo.txt") {
    this.#buffer = buffer;
    this.#keyBoardController = keyBoardController;
    this.#renderer = renderer;
    this.#fileName = fileName;
    this.#writer = writer
  }

  start() {
    this.#keyBoardController.on("buffer-write", (char) => {
      this.#buffer.storeText(char);
      this.#renderer(this.#buffer.getText());
    });

    this.#keyBoardController.on("new-line", (char) => {
      this.#buffer.storeText(char);
      this.#renderer(this.#buffer.getText());
    });

    this.#keyBoardController.on("backspace", () => {
      this.#buffer.removeAlphabet();
      this.#renderer(this.#buffer.getText());
    });

    this.#keyBoardController.on("stop", () => {
      this.#keyBoardController.stop();
      this.#renderer(this.#buffer.getText());
    });

    this.#keyBoardController.on("save", () => {
      this.#keyBoardController.stop();
      this.#writer.writeFileSync(this.#fileName, this.#buffer.getText());
    });

    this.#keyBoardController.start();
  }
}

exports.BufferController = BufferController;
