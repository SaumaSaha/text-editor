class Buffer {
  #textBeforeCursor;
  #textAfterCursor;
  #cursor;
  #cursorPos;

  constructor() {
    this.#cursor = "\x1B[5m│\x1B[0m";
    this.#textBeforeCursor = "";
    this.#textAfterCursor = "";
    this.#cursorPos = 0;
  }

  storeText(text) {
    this.#textBeforeCursor += text;
    this.#cursorPos += text.length;
  }

  removeAlphabet() {
    this.#textBeforeCursor = this.#textBeforeCursor.slice(0, -1);
    this.#cursorPos--;
  }

  getText() {
    return this.#textBeforeCursor + this.#cursor + this.#textAfterCursor;
  }

  saveText() {
    return this.#textBeforeCursor + this.#textAfterCursor;
  }

  deleteLine() {
    let lastIndexOfNewLine = (
      this.#textBeforeCursor + this.#textAfterCursor
    ).lastIndexOf("\n");
    if (lastIndexOfNewLine === -1) {
      lastIndexOfNewLine = 0;
      this.#cursorPos = 0;
    }
    this.#textBeforeCursor = this.#textBeforeCursor.slice(
      0,
      lastIndexOfNewLine
    );
  }

  deleteWord() {
    const lastIndexOfSpace = this.#textBeforeCursor.lastIndexOf(" ");
    this.#textBeforeCursor = this.#textBeforeCursor.slice(0, lastIndexOfSpace);
  }

  moveCursorLeft() {
    if (this.#cursorPos < 0) return;
    this.#cursorPos--;
    this.#textAfterCursor = this.#textBeforeCursor
      .slice(this.#cursorPos)
      .concat(this.#textAfterCursor);
    this.#textBeforeCursor = this.#textBeforeCursor.slice(0, this.#cursorPos);
  }

  moveCursorRight() {
    if (
      this.#cursorPos > (this.#textBeforeCursor + this.#textAfterCursor).length
    )
      return;
    this.#cursorPos++;
    this.#textBeforeCursor =
      this.#textBeforeCursor + this.#textAfterCursor.slice(0, 1);
    this.#textAfterCursor = this.#textAfterCursor.slice(1);
  }
}

module.exports = { Buffer };
