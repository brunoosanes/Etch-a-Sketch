const container = document.querySelector("#container");
const resetBtn = document.querySelector("#resetBtn");
const blackModeBtn = document.querySelector("#blackModeBtn");
const rainbowModeBtn = document.querySelector("#rainbowModeBtn");
const eraserModeBtn = document.querySelector("#eraserModeBtn");
const colorModeBtn = document.querySelector("#colorModeBtn");
const colorPicker = document.querySelector("#colorPicker");

const gridSizeSelector = document.getElementById("gridSizeSelector");
const gridSizeValue = document.getElementById("gridSizeValue");

//default settings
const DEFAULT_COLOR = "black";
const DEFAULT_GRID = "16";

let currentMode = DEFAULT_COLOR;

window.onload = newGrid(DEFAULT_GRID);

// grid value updater
gridSizeSelector.onmouseover = (e) => showNewGridSize(e.target.value);
gridSizeSelector.onchange = (e) => newGrid(e.target.value);

function showNewGridSize(value) {
  gridSizeValue.innerHTML = `${value} x ${value}`;
}

// grid creator
function newGrid(gridCurrentValue) {
  deleteGrid();
  container.style.gridTemplateColumns = `repeat(${gridCurrentValue}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${gridCurrentValue}, 1fr)`;
  for (i = 0; i < gridCurrentValue * gridCurrentValue; i++) {
    newDiv = document.createElement("div");
    newDiv.classList.add("newDiv");
    newDiv.addEventListener("mouseover", mouseState);
    newDiv.addEventListener("click", changeColor);
    container.appendChild(newDiv);
    showNewGridSize(gridCurrentValue);
  }
}

// reset grid
function deleteGrid() {
  container.innerHTML = "";
}

resetBtn.onclick = function resetGame() {
  newGrid(DEFAULT_GRID);
  showNewGridSize(DEFAULT_GRID);
  gridSizeSelector.value = "16";
  colorModeBtn.classList.remove("buttonActive");
  blackModeBtn.classList.add("buttonActive");
  rainbowModeBtn.classList.remove("buttonActive");
  eraserModeBtn.classList.remove("buttonActive");
};

// detect if mouse button is down or up, will only paint if mouse is down
let mouseIsDown = false;

window.addEventListener("mousedown", function () {
  mouseIsDown = true;
});

window.addEventListener("mouseup", function () {
  mouseIsDown = false;
});

function mouseState(e) {
  if (mouseIsDown) {
    changeColor(e);
  }
}

// changes current color acording to user's choice
let pickerCurrentColor = colorPicker.value;

function changeColor(e) {
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "erase") {
    e.target.style.backgroundColor = "white";
  } else if (currentMode === "black") {
    e.target.style.backgroundColor = "black";
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = pickerCurrentColor;
  }
}

//button handlers
eraserModeBtn.onclick = function activateEraseMode() {
  currentMode = "erase";
  colorModeBtn.classList.remove("buttonActive");
  blackModeBtn.classList.remove("buttonActive");
  rainbowModeBtn.classList.remove("buttonActive");
  eraserModeBtn.classList.add("buttonActive");
};

rainbowModeBtn.onclick = function activateColorMode() {
  currentMode = "rainbow";
  colorModeBtn.classList.remove("buttonActive");
  blackModeBtn.classList.remove("buttonActive");
  rainbowModeBtn.classList.add("buttonActive");
  eraserModeBtn.classList.remove("buttonActive");
};

blackModeBtn.onclick = function activateBlackMode() {
  currentMode = "black";
  colorModeBtn.classList.remove("buttonActive");
  blackModeBtn.classList.add("buttonActive");
  rainbowModeBtn.classList.remove("buttonActive");
  eraserModeBtn.classList.remove("buttonActive");
};

colorModeBtn.onclick = function activateColorMode() {
  currentMode = "color";
  colorModeBtn.classList.add("buttonActive");
  blackModeBtn.classList.remove("buttonActive");
  rainbowModeBtn.classList.remove("buttonActive");
  eraserModeBtn.classList.remove("buttonActive");
};

colorPicker.onchange = function changePickerCurrentColor(e) {
  pickerCurrentColor = e.target.value;
  currentMode = "color";
  colorModeBtn.classList.add("buttonActive");
  blackModeBtn.classList.remove("buttonActive");
  rainbowModeBtn.classList.remove("buttonActive");
  eraserModeBtn.classList.remove("buttonActive");
};
