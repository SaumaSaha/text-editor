const keyBindingsInsert = {
  "\r": ["new-line", "\n"],
  "\x13": ["save", "save"],
  "\x1B": ["change-mode", "ESC"],
  "\x7F": ["backspace", "back-space"],
  "\x13": ["save", "save"],
  "\x1B[D": ["move-left", "move-left"],
  "\x1B[C": ["move-right", "move-right"],
};

const keyBindingsNormal = {
  d: ["delete-line", "deleteLine"],
  w: ["delete-word", "deleteWord"],
  i: ["change-mode", "changeMode"],
  q: ["quit", "quit"],
  "\x13": ["save", "save"],
  "\x1B[D": ["move-left", "move-left"],
  "\x1B[C": ["move-right", "move-right"],
};

class EditorController {
  #modeControllers;
  #currentMode;
  #currentModeIndex;
  #fileName;
  #buffer;
  #fs;
  #kbController;

  constructor({ modeControllers, keyboardController, fs, buffer, fileName }) {
    this.#modeControllers = modeControllers;
    this.#currentModeIndex = 0;
    this.#currentMode = modeControllers[0];
    this.#fs = fs;
    this.#fileName = fileName;
    this.#buffer = buffer;
    this.#kbController = keyboardController;
  }

  #changeMode() {
    this.#currentMode.stop();
    this.#currentModeIndex =
      (this.#currentModeIndex + 1) % this.#modeControllers.length;
    this.#currentMode = this.#modeControllers[this.#currentModeIndex];
    this.#currentMode.start(this.#buffer);
  }

  #giveInstuction(key) {
    if (this.#currentMode.name() === "NORMAL") {
      const [event, eventData] = keyBindingsNormal[key] || ["", ""];
      this.#kbController.emit(event, eventData);
    } else {
      const [event, eventData] = keyBindingsInsert[key] || [
        "buffer-write",
        key,
      ];
      this.#kbController.emit(event, eventData);
    }
  }

  #addListener() {
    this.#kbController.on("key-entered", (key) => this.#giveInstuction(key));

    this.#kbController.on("save", () => {
      const content = this.#buffer.saveText();
      this.#fs.writeFileSync(this.#fileName, content);
    });

    this.#kbController.on("change-mode", () => {
      this.#changeMode();
    });
  }

  start() {
    if (this.#fileName === undefined) this.#fileName = "untitled.txt";
    if (this.#fs.existsSync(this.#fileName)) {
      const fileData = this.#fs.readFileSync(this.#fileName);
      this.#buffer.storeText(fileData);
    }

    this.#addListener();
    this.#currentMode.start(this.#buffer);
    this.#kbController.start();
  }
}

exports.EditorController = EditorController;
