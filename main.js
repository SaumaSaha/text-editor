const { BufferController } = require("./buffer-controller");
const { InputController } = require("./key-board-controller");
const { Buffer, renderer } = require("./buffer");

const keyBindings = {
	"\r": ["new-line", "\n"],
	"\x1B": ["stop", "ESC"],
	"\x7F": ["backspace", "back-space"],
	"\x13": ["save", "save"],
};

const main = () => {
	const fileNameToSave = process.argv[2];
	const buffer = new Buffer();
	const keyBoardController = new InputController(process.stdin, keyBindings);
	const bufferController = new BufferController(
		buffer,
		keyBoardController,
		renderer,
		fileNameToSave
	);
  
	bufferController.start();
};

main();
