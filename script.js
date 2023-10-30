let color = "black";
let isMouseDown = false;
let defaultSize = 16;
document.querySelector('.error').style.display = 'none';

function populateBoard(size) {
  let board = document.querySelector(".board");
  let squares = board.querySelectorAll('div');
  squares.forEach((div)=> div.remove());
  board.style.gridTemplateColumns = `repeat(${size} , 1fr)`;
  board.style.gridTemplateRows = `repeat(${size} , 1fr)`;
  
  let amount = size * size;
  for(let i = 0; i < amount; i++) {
    let square = document.createElement('div');
    square.addEventListener('click', colorSquare);
    square.addEventListener('mousedown', (event) => {
      isMouseDown = true;
      event.preventDefault();
    })
    square.addEventListener('mouseup', () => {
      isMouseDown = false;
    })
    square.addEventListener('mousemove', (event) => {
      if(isMouseDown) {
        if(color === "random") {
          square.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
          square.style.backgroundColor = color;
        }
        event.preventDefault();
      }
    })
    square.style.backgroundColor = "white";
    board.insertAdjacentElement("beforeend", square);
  }
}

populateBoard(defaultSize);

function colorSquare() {
    if(color === "random") {
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
      this.style.backgroundColor = color;
    }
}

function changeColor(choice) {
  color = choice;
}

function resetBoard() {
  populateBoard(defaultSize);
  color = "black";
}

document.getElementById('set-size-button').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';

  document.getElementById('popup-verify-button').addEventListener('click', () => {
    const newSize = parseInt(document.getElementById('popup-input').value, 10);
    if (newSize >= 2 && newSize <= 100) {
      document.querySelector('.error').style.display = 'none';
      populateBoard(newSize);
      popup.style.display = 'none';
    } else {
      document.querySelector('.error').style.display = 'flex';
    }
  });
});