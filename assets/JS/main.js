const pokemonList = document.getElementById('PokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
let offset = 0;
const limit = 10;
let maxRecords = 151;

function loadMorePokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
       <li class="Pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.number}</span>
                         <div class="detail">
                        <span class="name">${pokemon.name}</span>
                        <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}"/>
                    </div>

                  
                     <div class="stats ${pokemon.types[0]}">
                  <span class="stat ${pokemon.types[0]}">
                 <p>${pokemon.attack}</p>
                 <p>Attack</p> 
                 </span>

                   <span class="stat ${pokemon.types[0]}">
                <p>${pokemon.defense}</p>
                  <p>Defense</p> 
                     </span>   
                    <span class="stat ${pokemon.types[0]}">
                <p>${pokemon.speed}</p>
                  <p>Speed</p>
                    </span> 
            </div>

                </li>`
        ).join('')

        pokemonList.innerHTML += newHtml

    })
}

loadMorePokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {

    offset += limit

    const qntRecordNextPage = offset + limit
    if (qntRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadMorePokemons(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadMorePokemons(offset, limit)
    }
})


