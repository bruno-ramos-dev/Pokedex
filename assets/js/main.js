const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
// const pokemonCard = document.getElementById('card')

const maxRecords = 1000
const limit = 10
let offset = 0

const loadPokemonItens = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => `
            <li id="pokemon" class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">

                    <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">

                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
        // const pokemonLi = document.getElementsByClassName('pokemon')
        // console.log(pokemonLi);
        // pokemonLi.addEventListener('click', () => {
        //     showStats()
        // })
    })
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


// const showStats = () => {
//     pokemonCard.style.display = 'block';
// }

// const hideStats = () => {
//     pokemonCard.style.display = 'none';
// }

// pokemonCard.addEventListener('click', () => {
//     hideStats()
// })







