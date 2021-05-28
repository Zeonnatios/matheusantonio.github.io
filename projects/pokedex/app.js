const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = () => {
  
  const pokemonPromises = [];
  for (let i = 1; i <= 150; i += 1) {
    pokemonPromises.push(
      fetch(getPokemonURL(i)).then((response) => response.json())
    );
  }
  Promise.all(pokemonPromises).then((pokemons) => {
    const listPokemons = pokemons.reduce((acc, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
      acc += `
      <li class="card ${types[0]}">
        <img class="card-image" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">${types.join(' | ')}</p>
      </li>
      `
      return acc;
    }, '');
    console.log(listPokemons);
    document.querySelector('.pokedex').innerHTML = listPokemons;
  });
};

fetchPokemon();
