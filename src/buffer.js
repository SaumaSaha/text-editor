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

  deleteLine() {
    const lastIndexOfNewLine = this.#text.lastIndexOf("\n")
    this.#text = this.#text.slice(0, lastIndexOfNewLine)
  }

  deleteWord() {
    const lastIndexOfSpace = this.#text.lastIndexOf(" ")
    this.#text = this.#text.slice(0, lastIndexOfSpace)
  }
}

const renderer = (data, mode) => {
  console.clear();
  process.stdout.write(mode + " MODE\n");
  process.stdout.write(data);
};

module.exports = { Buffer, renderer };
