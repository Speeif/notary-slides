/**
 * A markdown writer script.
 * Everything is based off an array of lines, which represents the markdown file.
 * This array holds each line of the system, in markdown format. This then gets
 * edited and shown in the presentation area.
 */
let lineObject = document.getElementById("line");
let codeColumn = document.getElementById("code-column");
let numberColumn = document.getElementById("numbers");
const markdownCode = []



const lines = [];
const numbers = [];

function createNewLine(mother, lineNumber) {
    // Create Node and assign values
    let newLine = document.createElement("div")
    newLine.setAttribute("contenteditable", "true");
    newLine.setAttribute("id", "code")

    newLine.setAttribute("lineNumber", addNumber());

    /**
     * Supply a new line
     */
    newLine.addEventListener("keydown", (e) => {
        // If the user presses enter
        if (e.code == "Enter") {
            e.preventDefault();
            createNewLine(newLine);
        }
        //
    })

    /**
     * Add all code to markdown array
     */
    newLine.addEventListener("input", (e) => {
        if (e.inputType == "insertText") {
            markdownCode.push(e.data);
            console.log(markdownCode)
        }
    })


    /**
     * Event listener for finding 
     */

    // Before input is received
    newLine.addEventListener("beforeinput", (e) => {
        let newnewLine = newLine
        if (newnewLine.previousSibling == null) {
            return
        }
        getCaretPosition(newnewLine)
        console.log(newnewLine.innerHTML.length)
        if (newnewLine.innerHTML.length == 0 && e.inputType == "deleteContentBackward") {
            newnewLine.previousSibling.focus();
            removeNumber();
            codeColumn.removeChild(newnewLine);
        } else if (getCaretPosition(newnewLine) == 0 && e.inputType == "deleteContentBackward") {
            let sibling = newnewLine.previousSibling;
            let caretPos = sibling.setSelectionRange();
            sibling.innerHTML += newnewLine.innerHTML;
            sibling.focus();
            codeColumn.removeChild(newLine);
        }
    })


    // If this is the first object of this type.
    if (mother == codeColumn) {
        console.log("test")
        // Append it to the markdown wrapper.
        codeColumn.appendChild(newLine);
        newLine.focus()
    }
    // If not the first, then
    else {
        mother.after(newLine)
        newLine.focus();
    }

}

/**
 * Documenting as I write. Using "beforeinput" helps with 
 * what to do with the received input, this also stops any 
 * unintended behaviour when programming.
 * 
 * I ran into the problem, that my 'markdown' wrapper was
 * contenteditable=true, however, everytime I wanted to
 * edit a whole line, I could not select the line, and
 * had to select or reach EVERYTHING in the wrapper.
 * 
 * I am now trying to create contenteditable=true line
 * divs instead. Hopin that my input would display better
 * this way
 */

createNewLine(codeColumn)


function addNumber() {
    let newNumberLine = document.createElement("p")
    let newNumber = (numberColumn.children.length + 1)
    newNumberLine.innerHTML = newNumber;
    numberColumn.appendChild(newNumberLine);
    return newNumber;
}

function removeNumber() {
    let oldNumber = numberColumn.lastChild;
    numberColumn.removeChild(oldNumber);
}


/**
 * A function to get the caret position within an element.
 * Assumptions for usage:
 * * There is always a single text node within the editable <div> and no other nodes
 * * The editable div does not have the CSS white-space property set to pre
 * @param {Node} The node parameter that the caret is within 
 * @returns caret position within the given Node
 */
function getCaretPosition(editableDiv) {
    var caretPos = 0,
        sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        console.log(sel)
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            console.log(range)
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
                console.log(caretPos)
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}