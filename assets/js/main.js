const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const modal = document.getElementById('modal')


const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick=openModal(${pokemon.number})>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function openModal(pokemonId) {
    pokeApi.getPokemon(pokemonId).then((pokemon) => {
        modal.innerHTML = convertPokemonToModal(pokemon)
        modal.classList.add(pokemon.type)
    })

    modal.showModal();
}

function convertPokemonToModal(pokemon) {
    return `
              <div class="pokemon">
                <h1 class="name">${pokemon.name}</h1>
                <a class="number">#${pokemon.number}</a>
                
                <p class="name"> Weight: ${pokemon.weight}</p>
                <p class="name"> Height: ${pokemon.height}</p>
                <p class="name"> Base Experience: ${pokemon.base_experience}</p>



                <div class="detail">
                    <h3 class="name">Types</h3> 
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type} name">${type}</li>`).join('')}
                    </ol>

                    <h3 class="name">Abilities</h3>
                    <ol>
                        ${pokemon.abilities.map((ability) => `<li class="ability ${ability} name">${ability}</li>`).join('')}
                    </ol>
                    
                </div>

                <img src="${pokemon.photo}"
                alt ="${pokemon.name}">

                <button onclick="closeModal()" id="close"> x </button>
              </div>
    `
}

function closeModal() {
    modal.close()
}

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });