class EditorController {
  #modeControllers;
  #currentMode;
  #currentModeIndex;
  #fileName;
  #buffer;
  #fs;
  #keyboardController;

  constructor(modeControllers, keyboardController, fileSystem, buffer, fileName = "untitled.txt") {
    this.#modeControllers = modeControllers;
    this.#currentModeIndex = 0
    this.#currentMode = modeControllers[0];
    this.#fs = fileSystem;
    this.#fileName = fileName;
    this.#buffer = buffer;
    this.#keyboardController = keyboardController;
  }

  #changeMode() {
    this.#currentMode.stop();
    this.#currentModeIndex = (this.#currentModeIndex + 1) % this.#modeControllers.length;
    this.#currentMode = this.#modeControllers[this.#currentModeIndex];
    this.#currentMode.start(this.#buffer);
  }

  start() {
    if (this.#fs.existsSync(this.#fileName)) {
      const fileData = this.#fs.readFileSync(this.#fileName);
      this.#buffer.storeText(fileData);
    }

    this.#keyboardController.on("stop", () => {
      this.#keyboardController.stop()
    })

    this.#keyboardController.on("save", () => {
      this.#keyboardController.stop()
      const content = this.#buffer.getText()
      this.#fs.writeFileSync(this.#fileName, content)
    })

    this.#keyboardController.on("change-mode", () => {
      this.#changeMode();
    })

    this.#currentMode.start(this.#buffer);
    this.#keyboardController.start()
  }
}

exports.EditorController = EditorController;