const board = document.querySelector('#pixel-board');
const selectColor = document.getElementById('color-palette');
const paintPixel = document.getElementById('pixel-board');
const buttonClear = document.getElementById('clear-board');
/** Consultei uma função do site para gerar cores hexadecimais aleatórias.
 * Source: https://wallacemaxters.com.br/blog/2021/02/20/como-gerar-cores-aleatorias-no-javascript */
function generateColor(opacidade = 1) {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}

function setColorPalette() {
  const color = document.querySelectorAll('.color');
  color[0].classList.add('selected');
  color[0].style.backgroundColor = 'black';
  const arrColors = [generateColor(), generateColor(), generateColor()];
  for (let index = 1; index <= arrColors.length; index += 1) {
    color[index].style.backgroundColor = arrColors[index - 1];
  }
}

setColorPalette();

function generatePixels(row, column) {
  const table = document.createElement('table');
  board.appendChild(table);
  for (let index = 0; index < row; index += 1) {
    const tr = document.createElement('tr');
    for (let secondIndex = 0; secondIndex < column; secondIndex += 1) {
      const td = document.createElement('td');
      const div = document.createElement('div');
      div.classList.add('pixel');
      td.appendChild(div);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function pixelBoardSize() {
  const table = document.createElement('table');
  board.appendChild(table);
  generatePixels(5, 5);
}

pixelBoardSize();

selectColor.addEventListener('click', (event) => {
  if (event.target.tagName === 'DIV') {
    const reset = document.querySelector('.selected');
    reset.classList.remove('selected');
    const selectedColor = event.target;
    selectedColor.classList.add('selected');
  }
});

paintPixel.addEventListener('click', (event) => {
  if (event.target.tagName === 'DIV') {
    const selectedColor = document.querySelector('.selected');
    const pixel = event.target;
    pixel.style.backgroundColor = selectedColor.style.backgroundColor;
  }
});

buttonClear.addEventListener('click', () => {
  const pixel = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
});

function generateBoard() {
  const button = document.getElementById('generate-board');
  const boardSize = document.getElementById('board-size');
  button.addEventListener('click', () => {
    let size = parseInt(boardSize.value, 10);
    boardSize.value = '';
    if (!size) {
      return alert('Board inválido!');
    }
    board.lastChild.remove();
    if (size < 5) {
      size = 5;
    } else if (size > 50) {
      size = 50;
    }
    generatePixels(size, size);
  });
}

generateBoard();
