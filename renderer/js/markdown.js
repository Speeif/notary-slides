let lineObject = document.getElementById("line");
let markdown = document.getElementById("code");

let newLine = true;
let hasCommand = false;

markdown.addEventListener("keydown", (e) => {

    if (markdown.children.length == 0) {
        markdown.appendChild(<div value="1"></div>)
    }

    let chilren = markdown.childNodes;

    chilren.forEach((c) => {
        console.log(c);
    })
})