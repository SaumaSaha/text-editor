class Buffer {
	#text;
	constructor() {
		this.#text = "";
	}

	storeText(text) {
		this.#text += text;
	}

	removeAlphabet() {
		this.#text = this.#text.slice(0, -1);
	}

	getText() {
		return this.#text;
	}
}

const renderer = (data) => {
	console.clear();
	console.log(data);
};

module.exports = { Buffer, renderer };
