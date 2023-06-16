class Buffer {
  #text;
  #cursor;

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
    let lastIndexOfNewLine = this.#text.lastIndexOf("\n");
    if (lastIndexOfNewLine === -1) lastIndexOfNewLine = 0;
    this.#text = this.#text.slice(0, lastIndexOfNewLine);
  }

  deleteWord() {
    const lastIndexOfSpace = this.#text.lastIndexOf(" ");
    this.#text = this.#text.slice(0, lastIndexOfSpace);
  }

  moveCursorLeft() {}
}

module.exports = { Buffer };
