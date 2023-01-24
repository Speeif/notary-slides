
class markdownLine {
    /**
     * 
     * @param { int} line number for the given line 
     */
    constructor(lineNumber) {
        this.lineNumber = lineNumber;
        this.text = "";
    }

    getLineNumber() {
        return this.lineNumber;
    }

    setLineNumber(newLineNumber) {
        this.lineNumber = newLineNumber;
    }

    setText(text) {
        this.text = text;
        return this.display()
    }

    /**
     * Returns the object string associated with the line.
     * @returns { string } text string
     */
    getText() {
        return this.text;
    }

    display() {
        let tempString = "";

        let asterisks = this.text.split("*")

        console.log(asterisks)
    }
}