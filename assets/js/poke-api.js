const convertPokeApiDetailToPokemon = (pokeDetail) => {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

const pokeApi = {
    getPokemonDetail: async (pokemon) => {
        const response = await fetch(pokemon.url)
        const pokeDetail = await response.json()
        return convertPokeApiDetailToPokemon(pokeDetail)
    },
    getPokemons: async (offset = 0, limit = 10) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        try {
            const response = await fetch(url)
            const jsonBody = await response.json()
            const pokemons = await jsonBody.results
            const detailRequests = pokemons.map(pokeApi.getPokemonDetail)
            const pokemonsDetails = await Promise.all(detailRequests)
            return pokemonsDetails
        } catch (error) {
            return console.error(error)
        }
    }
}