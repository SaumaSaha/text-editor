const { EventEmitter } = require("events");

class InputController extends EventEmitter {
  #stdin;
  #keyBindings;

  constructor(stdin, keyBindings) {
    super();
    this.#stdin = stdin;
    this.#keyBindings = keyBindings;
  }

  #setUpEnvironment() {
    this.#stdin.setRawMode(true);
    this.#stdin.setEncoding("utf-8");
  }
  #findEventToEmit(key){
    return this.#keyBindings[key] || ["buffer-write", key];
  }
  start() {
    this.#setUpEnvironment();
    this.#stdin.on("data", (key) => {
      const [event,eData] = this.#findEventToEmit(key);
      this.emit(event, eData);
    });
  }

  stop() {
    this.#stdin.setRawMode(false);
    this.#stdin.destroy();
  }
}

exports.InputController = InputController;
