const ol = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');
const buttonAddTodo = document.getElementById('criar-tarefa');
const buttonClearAll = document.getElementById('apaga-tudo');
const buttonClearChecked = document.getElementById('remover-finalizados');
const buttonClearSelected = document.getElementById('remover-selecionado');
const buttonSaveList = document.getElementById('salvar-tarefas');
const buttonUp = document.getElementById('mover-cima');
const buttonDown = document.getElementById('mover-baixo');

buttonAddTodo.addEventListener('click', () => {
  const li = document.createElement('li');
  li.innerText = input.value;
  ol.appendChild(li);
  input.value = '';
});

ol.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const selectedItem = document.querySelector('.selected');
    if (selectedItem !== null) {
      selectedItem.classList.remove('selected');
    }
    e.target.classList.add('selected');
  }
});

ol.addEventListener('dblclick', (e) => {
  e.target.classList.toggle('completed');
});

buttonClearAll.addEventListener('click', () => {
  ol.innerHTML = '';
});

buttonClearChecked.addEventListener('click', () => {
  const li = document.querySelectorAll('.completed');
  for (let index = 0; index < li.length; index += 1) {
    li[index].remove();
  }
});

buttonClearSelected.addEventListener('click', () => {
  const liSelected = document.querySelector('.selected');
  ol.removeChild(liSelected);
});

buttonSaveList.addEventListener('click', () => {
  localStorage.setItem('items', ol.innerHTML);
});

function initialize() {
  const items = localStorage.getItem('items');
  if (items) ol.innerHTML = items;
}

initialize();

buttonUp.addEventListener('click', () => {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem && selectedItem.previousElementSibling) {
    ol.insertBefore(selectedItem, selectedItem.previousElementSibling);
  }
});

buttonDown.addEventListener('click', () => {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem && selectedItem.nextElementSibling) {
    ol.insertBefore(selectedItem.nextElementSibling, selectedItem);
  }
});
