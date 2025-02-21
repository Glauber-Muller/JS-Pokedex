const pokeApi = {}

function convertePokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.attack = pokeDetail.stats.find(stat => stat.stat.name === "attack")?.base_stat;
    pokemon.defense = pokeDetail.stats.find(stat => stat.stat.name === "defense")?.base_stat;
    pokemon.speed = pokeDetail.stats.find(stat => stat.stat.name === "speed")?.base_stat;

    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch (pokemon.url)
    .then((response) => response.json())
    .then(convertePokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
 
return fetch(url)
 .then(response => response.json())
 .then(jsonBody => jsonBody.results)
 .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
 .then((detailRequest) => Promise.all(detailRequest))
 .then((pokemonsDetails) => pokemonsDetails)
}