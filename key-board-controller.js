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

	start() {
		this.#setUpEnvironment();
		this.#stdin.on("data", (key) => {
			if (key in this.#keyBindings) {
				const [event, data] = this.#keyBindings[key];
				this.emit(event, data);
			} else {
				this.emit("buffer-write", key);
			}
		});
	}

	stop() {
		this.#stdin.setRawMode(false);
		this.#stdin.destroy();
	}
}

exports.InputController = InputController;
