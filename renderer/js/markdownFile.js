import("./markdownLine")

class markdownFile {

    /**
     * Creates a new markdown file object, with an attached array of `markdownLine`s.
     */
    constructor() {
        this.lines = [new markdownLine(1)]
    }

    /**
     * Digitally in markdown file, creates a new line. Does not work with DOM elements
     * @param {Node} sibling 
     * @returns { number } returns the new line number
     */
    newLine(siblingNumber) {
        let newLine = new markdownLine(siblingNumber + 1);
        this.lines.push(newLine);

        // For each line in lines
        this.lines.map((line) => {
            // Get the line number
            let elementLineNumber = line.getLineNumber();
            // If the line number is higher than the new line number
            if (elementLineNumber > siblingNumber + 1) {
                // Add a one to the lineNumber
                line.setLineNumber(line.getLineNumber + 1)
            }
        })

        // Sort the array
        this.sortLines();
    }

    /**
     * Removes a line in the markdown file.
     * @param { number} lineNumber to be removed
     */
    removeLine(lineNumber) {
        // Get the line in question
        let line = this.lines[lineNumber];

        // If it contains content
        if (line.getText().length != 0) {
            // add the content to the line above it
            let newParent = this.lines[lineNumber - 1];
            newParent.setText(newParent.getText() + line.getText());
        }

        // For each element in the list
        this.lines.map(e => {
            // Change the line number to be one less, if it was below the current line.
            let elementLineNumber = e.getLineNumber();
            if (elementLineNumber > lineNumber) {
                e.setLineNumber(elementLineNumber - 1);
            }
        });

        // Remove the line
        let index = this.lines.indexOf(line);
        this.lines.splice(idex, 1);

        // Sort to be safe
        // TODO: determine if this should be removed - potential useless call.
        this.sortLines()
    }

    /**
     * Updates the line's text to HTML objects and returns it to the user.
     * @param {number} lineNumber for the given element
     * @returns updated innerHTML for a line
     */
    updateLine(lineNumber) {
        return this.lines[lineNumber].updateText();
    }

    /**
     * Sorts the lines, such that each line in the array is sorted based on lineNumber
     */
    sortLines() {
        this.line.sort((a, b) => {
            return a.getLineNumber() - b.getLineNumber()
        })
    }
}