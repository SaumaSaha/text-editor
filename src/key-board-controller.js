const { EventEmitter } = require("events");

class InputController extends EventEmitter {
  #stdin;

  constructor(stdin) {
    super();
    this.#stdin = stdin;
  }

  #setUpEnvironment() {
    this.#stdin.setRawMode(true);
    this.#stdin.setEncoding("utf-8");
  }

  start() {
    this.#setUpEnvironment();
    this.#stdin.on("data", (key) => {
      this.emit("key-entered", key);
    });
  }

  stop() {
    this.#stdin.setRawMode(false);
    this.#stdin.destroy();
  }
}

exports.InputController = InputController;
