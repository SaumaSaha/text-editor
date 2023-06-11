class InsertModeController {
  #buffer;
  #keyBoardController;
  #renderer;
  #fileName;
  #fs

  constructor(buffer, keyBoardController, renderer, fileSystem, fileName = "demo.txt") {
    this.#buffer = buffer;
    this.#keyBoardController = keyBoardController;
    this.#renderer = renderer;
    this.#fileName = fileName;
    this.#fs = fileSystem
  }

  start() {

    if (this.#fs.existsSync(this.#fileName)) {
      const fileData = this.#fs.readFileSync(this.#fileName);
      this.#buffer.storeText(fileData)
    }

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
      this.#fs.writeFileSync(this.#fileName, this.#buffer.getText());
    });

    this.#keyBoardController.start();
  }
}

exports.InsertModeController = InsertModeController;
