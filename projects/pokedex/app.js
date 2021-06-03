const ul = document.querySelector('.pokedex');

const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonURL(index + 1)).then((response) => response.json())
    );

const generateElements = (pokemons) =>
  pokemons.forEach(({ id, name, types }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    const li = document.createElement('li');
    li.classList.add('card', `${elementTypes[0]}`);
    const img = document.createElement('img');
    img.src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    img.classList.add('card-image');
    img.alt = `${name}`;
    const h2 = document.createElement('h2');
    h2.classList.add('card-title');
    h2.innerHTML = `${id}. ${name}`;
    const p = document.createElement('p');
    p.classList.add('card-subtitle');
    p.innerHTML = `${elementTypes.join(' | ')}`;
    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
    ul.appendChild(li);
  });

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateElements);
