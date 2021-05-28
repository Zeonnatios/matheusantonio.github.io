const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  fetch(getPokemonURL(index + 1)).then((response) => response.json())
);


const generateHTML = pokemons => pokemons.reduce((acc, { id, name, types }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    acc += `
      <li class="card ${elementTypes[0]}">
        <img class="card-image" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="${name}">
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementTypes.join(' | ')}</p>
      </li>
    `
  return acc;
  }, '');

const insertPokemonsInList = listPokemons => {
  document.querySelector('.pokedex').innerHTML = listPokemons;
}

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
  .then(generateHTML) 
  .then(insertPokemonsInList);


