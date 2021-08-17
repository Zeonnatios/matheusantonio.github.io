const ul = document.querySelector('.pokedex');

const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () =>
    Array(150).fill().map((_, index) =>
      fetch(getPokemonURL(index + 1)).then((response) => response.json())
    );

const createCustomElement = (tag, classList, innerHTML) => {
  const element = document.createElement(tag);
  element.classList.add(classList);
  element.innerHTML = innerHTML;
  return element;
};

const createImageElement = (id, classList, alt) => {
  const img = document.createElement('img');
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  img.className = classList;
  img.alt = alt;
  return img;
};

const generateElements = (pokemons) =>
  pokemons.forEach(({ id, name, types }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    const li = document.createElement('li');
    li.classList.add('card', `${elementTypes[0]}`);
    const img = createImageElement(id, 'card-image', name);
    const h2 = createCustomElement('h2', 'card-title', `${id}. ${name}`);
    const p = createCustomElement('p', 'card-subtitle', `${elementTypes.join(' | ')}`);
    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
    ul.appendChild(li);
  });

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateElements);
