const divImage = document.getElementById('image');
const buttonCheck = document.getElementById('check');
const buttonNext = document.getElementById('next');

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

const setPoints = () => {
  const input = document.getElementById('input').value;
  const image = document.getElementById('pokemon');
  let points = parseInt(document.querySelector('.points').innerHTML, 10);
  console.log(input, image.alt);
  if (input.toLowerCase() === image.alt.toLowerCase()) {
    points += 1;
    document.querySelector('.points').innerHTML = points;
    image.classList.remove('no-brightness');
  }
};

generateRandomPokemon();
buttonCheck.addEventListener('click', setPoints);
buttonNext.addEventListener('click', generateRandomPokemon);
