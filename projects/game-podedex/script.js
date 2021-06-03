const divImage = document.getElementById('image');
const buttonCheck = document.getElementById('check');
const buttonNext = document.getElementById('next');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal-close');
const modalContent = document.querySelector('.modal-content');
const input = document.getElementById('input');

const getRandomIntInclusive = () => {
  min = Math.ceil(1);
  max = Math.floor(150);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createImagePokemon = ({ id, name }) => {
  const img = document.createElement('img');
  img.id = 'pokemon';
  img.src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  img.alt = name;
  img.classList.add('no-brightness', 'pokemon-image');
  return img;
};

const generateRandomPokemon = async () => {
  const randomId = getRandomIntInclusive();
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const pokemon = await response.json();
  const imageElement = createImagePokemon(pokemon);
  nextPokemon(imageElement);
};

const nextPokemon = (element) => {
  if (divImage.lastChild) {
    divImage.removeChild(divImage.lastChild);
  }
  divImage.appendChild(element);
};

closeModalButton.addEventListener('click', (event) => {
  modal.classList.remove('is-active');
});

const success = `
<article class="message is-success">
  <div class="message-header">
    <h3>Parabéns</h3>
  </div>
  <div class="message-body">
    <p class"paragraph"> Parabéns. Você acertou !!! <i class="fas fa-check-circle"></i></p>
  </div>
</article>`;

const failure = `
<article class="message is-danger">
  <div class="message-header">
    <p>Tente novamente</p>
  </div>
  <div class="message-body">
    <p class"paragraph"> Que pena. Você errou !!! <i class="fas fa-times-circle"></i></p>
  </div>
</article>`;

const setPoints = (event) => {
  const image = document.getElementById('pokemon');
  let points = parseInt(document.querySelector('.points').innerHTML, 10);
  console.log(input.value, image.alt);
  if (input.value.toLowerCase() === image.alt.toLowerCase()) {
    points += 1;
    document.querySelector('.points').innerHTML = points;
    image.classList.remove('no-brightness');
    input.value = '';
    input.disabled = true;
    event.target.disabled = true;
    modalContent.innerHTML = success;
    modal.classList.add('is-active');
  }
  else {
    input.value = '';
    input.disabled = true;
    event.target.disabled = true;
    modalContent.innerHTML = failure;
    modal.classList.add('is-active');
  }
};

generateRandomPokemon();
buttonCheck.addEventListener('click', setPoints);
buttonNext.addEventListener('click', () => {
  generateRandomPokemon();
  if (buttonCheck.disabled) {
    buttonCheck.disabled = false;
    input.disabled = false;
  }
});
