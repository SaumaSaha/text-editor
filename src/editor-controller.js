class EditorController {
  #modeControllers;
  #currentMode;
  #currentModeIndex;
  #fileName;
  #buffer;
  #fs;
  #kbController;

  constructor(modeControllers, keyboardController, fileSystem, buffer, fileName = "untitled.txt") {
    this.#modeControllers = modeControllers;
    this.#currentModeIndex = 0
    this.#currentMode = modeControllers[0];
    this.#fs = fileSystem;
    this.#fileName = fileName;
    this.#buffer = buffer;
    this.#kbController = keyboardController;
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

    this.#kbController.on("stop", () => {
      this.#kbController.stop()
    })

    this.#kbController.on("save", () => {
      this.#kbController.stop()
      const content = this.#buffer.getText()
      this.#fs.writeFileSync(this.#fileName, content)
    })

    this.#kbController.on("change-mode", () => {
      this.#changeMode();
    })

    this.#currentMode.start(this.#buffer);
    this.#kbController.start()
  }
}

exports.EditorController = EditorController;