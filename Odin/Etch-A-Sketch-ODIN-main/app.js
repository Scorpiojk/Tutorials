const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
  currentColor = newColor
}
  
  function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}
  
  function setCurrentSize(newSize) {
    currentSize = newSize
}

const colorPicker = document.getElementById('colorPick');
const colorBtn = document.getElementById('color');
const rainbowBtn = document.getElementById('rainbow');
const shadowBtn = document.getElementById('shadow');
const clearBtn = document.getElementById('clear');
const eraseBtn = document.getElementById('erase');
const rangeValue = document.getElementById('valueGrids'); 
const rangeGrids = document.getElementById('rangeGrids');
const sketchpad = document.getElementById('container');

colorPicker.onchange = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
shadowBtn.onclick = () => setCurrentMode('shadow')
clearBtn.onclick = () => reloadGrid()
eraseBtn.onclick = () => setCurrentMode('eraser')
// rangeValue.onmousemove = (e) => updateSizeValue(e.target.value)
rangeGrids.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
  }        

function updateSizeValue(value) {
    rangeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid(){
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid(){
    sketchpad.innerHTML = ''
}

function setupBorders() {
  sketchpad.toggleAttribute()
} 


function setupGrid(size){
    sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    sketchpad.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
            const grid = document.createElement('div');
            grid.addEventListener('mouseover', changeColor);
            sketchpad.appendChild(grid);
    }
}


function changeColor(e) {
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 255)
      const randomG = Math.floor(Math.random() * 255)
      const randomB = Math.floor(Math.random() * 255)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    } else if (currentMode === 'shadow') {
      if (this.style.backgroundColor.match(/rgba/)) {
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            this.classList.add('gray');
        }
    } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
    } else {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
    }
    }
  }

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraseBtn.classList.remove('active')
    } else if (currentMode === 'shadow'){
      shadowBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraseBtn.classList.add('active')
    } else if (newMode === 'shadow') {
      shadowBtn.classList.add('active')
    }
}


window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}


function toogleBorders() {
  var element = document.getElementById("container");
  element.classList.toggle("container");
}