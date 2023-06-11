const fs = require("fs");

class BufferController {
	#buffer;
	#keyBoardController;
	#renderer;
	#fileName;

	constructor(buffer, keyBoardController, renderer, fileName = "demo.txt") {
		this.#buffer = buffer;
		this.#keyBoardController = keyBoardController;
		this.#renderer = renderer;
		this.#fileName = fileName;
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
			fs.writeFileSync(this.#fileName, this.#buffer.getText());
		});

		this.#keyBoardController.start();
	}
}

exports.BufferController = BufferController;
