const mover = document.getElementById("mover");
const grid = document.querySelector("#columns")
let isDown = false;
let offsetx = 0;

mover.addEventListener("mousedown", (e) => {
    isDown = true;
    offsetx = mover.offsetLeft - e.clientX;
})

document.addEventListener("mouseup", () => isDown = false)

document.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (isDown) {
        let minspace = 150;
        let moveAmount = e.clientX + offsetx - 7;
        // Clamp value in both left and right column
        let left = Math.min(Math.max(moveAmount, minspace), window.innerWidth - 7 - minspace)
        let right = Math.min(Math.max(window.innerWidth - moveAmount - 7, minspace), window.innerWidth - minspace - 7)
        grid.style.gridTemplateColumns = left + "px 7px " + right + "px";
        console.log(left + "px 7px " + right + "px")
    }
});


console.log(mover)