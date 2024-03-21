
//views

for (var i = 0; i < 20; i++) {
  let cellDivs = '<div>';
  for (let i = 1; i <= 10; i++) cellDivs += `<div class='${i}'></div>`;
  cellDivs += '</div>';

  document.getElementById("play-field").innerHTML = document.getElementById("play-field").innerHTML + cellDivs;
}

let score = 0;
let currentRow = 10;
let length = 10;
let animatedBlockStart = 0;

document.getElementById("start").addEventListener("click", start);

function start() {
  fillBlock(currentRow, length);
  animateBlock(currentRow, length, animatedBlockStart);
  document.getElementById("start").removeEventListener("click", start);
  document.addEventListener("keypress", keyPressed);
}

function fillBlock(row, length) {
  const rowArray = document.getElementsByClassName(row.toString())

  for (var i = 0; i < length; i++) {
    rowArray[i].style.backgroundColor = 'firebrick';
  }

}

// animated the current block
let direction = 'forward';
let timerId;
function animateBlock(row, animatedBlockEnd, animatedBlockStart) {
  timerId = setInterval(() => {
    const rowArray = document.getElementsByClassName(row.toString());
    if (animatedBlockEnd < 20 && direction == 'forward') {
      // set last block
      rowArray[animatedBlockEnd].style.backgroundColor = 'firebrick';
      animatedBlockEnd++;
      // remove first block
      rowArray[animatedBlockStart].style.backgroundColor = '';
      animatedBlockStart++;
    }
    // arrive at the end, turn around
    else if (animatedBlockEnd === 20) {

      animatedBlockEnd = animatedBlockStart - 1;
      animatedBlockStart = 19;
      direction = 'backward';
    }
    // arrive at the start, turn around
    else if (animatedBlockEnd < 20 && direction == 'backward') {

      rowArray[animatedBlockEnd].style.backgroundColor = 'firebrick';
      animatedBlockEnd--;
      rowArray[animatedBlockStart].style.backgroundColor = '';
      animatedBlockStart--;
      if (animatedBlockEnd == -1) {
        animatedBlockEnd = animatedBlockStart + 1;
        animatedBlockStart = 0;
        direction = 'forward';
      }
    }

  }, 100);
}

/**
 * respone do key down
 * @param {Event} event the event
 */
const keyPressed = event => {
  if (event.key === ' ') {
    currentRow--;
    if (currentRow == 0) {
      alert("you won the match !!");
      window.location.reload();
    }
    animatedBlockStart = 0;
    direction = 'forward';

    clearInterval(timerId);
    cutBlock(currentRow + 1);
    start();
  }
}
/**
 * Check if two vertical adjecent blocks have the same color
 * @param {Node} elem1 lower element
 * @param {Node} elem2 higher element
 * @returns true if same color
 */
function sameColor(elem1, elem2) {
  const elem1Color = window.getComputedStyle(elem1).getPropertyValue("background-color");
  const elem2Color = window.getComputedStyle(elem2).getPropertyValue("background-color");
  return elem1Color === elem2Color;
}

/**
 * check if an element is transparent
 * @param {Node} elem check this element
 * @returns true if transparant
 */
function isTransparent(elem) {
  const elemColor = window.getComputedStyle(elem).getPropertyValue("background-color")
  return elemColor == 'rgba(0, 0, 0, 0)';
}

/**
 * get the length of the new block
 * @param {int} block number of the active row
 */
function cutBlock(block) {
  let newLength = 0;
  if (block == 10) {
    newLength = 10;
  }
  else {
    const blockCurrentRowArray = document.getElementsByClassName(block.toString());
    const blockNextRowArray = document.getElementsByClassName((block + 1).toString())
    for (var i = 0; i <= 19; i++) {
      let cellCurrentRow = blockCurrentRowArray[i];
      let cellNextRow = blockNextRowArray[i];

      if (!sameColor(cellCurrentRow, cellNextRow)) {

        if (isTransparent(cellNextRow)) {

          cellCurrentRow.style.backgroundColor = cellNextRow.style.backgroundColor;

        }
      }
      else {
        if (!isTransparent(cellNextRow))
          newLength++;
      }
    }
  }
  length = newLength;
  if (length != 0) {
    score = score + 10;
    document.getElementById("scr").innerHTML = score;
  }
  else {
    setTimeout(() => {
      alert("GAME OVER !! YOUR SCORE IS :- " + score);
      window.location.reload();
    }, 100);

  }

}