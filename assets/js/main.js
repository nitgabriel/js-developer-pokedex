const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}" onclick="loadPokemonModal(${pokemon.number})">
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

function closeModal() {
    const modal = document.getElementById('modal')
    modal.style.display = 'none'
}

function showData(contentTab) {
    aboutPokemon = document.getElementById('aboutPokemon')
    baseStats = document.getElementById('baseStats')

    if (contentTab === 'aboutPokemon') {
        aboutPokemon.style.display = 'block'
        baseStats.style.display = 'none'
    } else if (contentTab === 'baseStats') {
        aboutPokemon.style.display = 'none'
        baseStats.style.display = 'block'
    }
}

function loadPokemonModal(pokemonId) {
    pokeApi.getPokemonToModal(pokemonId).then((pokemonModalHTML) => {
        pokemonModal = pokemonModalHTML
        const modal = document.getElementById('modal')
        modal.innerHTML = pokemonDataToModal(pokemonModal)
        modal.style.display = 'block'
        showData(aboutPokemon)
    })
}

function pokemonDataToModal(pokemon) {
    return `
        <div id="detailHeader" class="${pokemonModal.type}">
            <button class="back-button" style="border-radius: 12px; border: 1px transparent; background-color: transparent;">
                <img src="/assets/img/left-arrow-svgrepo-com.svg" alt="Back" height="24px" onclick="closeModal()"/>
            </button>
            <div id="fixedPokemonData">
                <div id="pokemonName">${pokemonModal.name}</div>
                <span id="pokemonId">#${pokemonModal.number}</span>
                
            </div>
            <ol class="typesModal">
                ${pokemonModal.types.map((type) => `<li class="typeModal ${type}">${type}</li>`).join('')}
            </ol>
            <div class="pokemonPhotoBorder">
                <div class="pokemonPhoto">
                    <img src="${pokemonModal.photo}"
                    alt="${pokemonModal.name}">
                </div>
                
            </div>
        </div>
        <div id="detailBottom">
            <div class="topnav">
                <a onclick="showData('aboutPokemon')" >About</a>
                <a onclick="showData('baseStats')" >Base Stats</a>
            </div>
            <div id="aboutPokemon" class="tabcontent">
                <div class="pokemonDescription">
                    <p id="pokemonDescription">${pokemonModal.flavorText}</p>
                </div>
                <div class="pokemonData">
                    <div class="pokemonDataTitle">Height</div>
                    <div class="pokemonDataValue">${pokemonModal.height/10} m</div>
                </div>
                <div class="pokemonData">
                    <div class="pokemonDataTitle">Weight</div>
                    <div class="pokemonDataValue">${pokemonModal.weight/10} kg</div>
                </div>
                <div class="pokemonData">
                    <div class="pokemonDataTitle">Abilities</div>
                    <div class="pokemonDataValue">${pokemonModal.abilities.map((abilities) => `<li class="abilities">${abilities}</li>`).join('')}</div>
                </div>
            </div>
            <div id="baseStats" class="baseStatsPokemon">
                <div class="pokemonData">
                    <div class="pokemonDataTitle">HP</div>
                    <div class="pokemonDataValue">${pokemonModal.hp}</div>
                </div>
                <div class="pokemonData">
                    <div class="pokemonDataTitle">Attack</div>
                    <div class="pokemonDataValue">${pokemonModal.attack}</div>
                </div>
                <div class="pokemonData">
                    <div class="pokemonDataTitle">Defense</div>
                    <div class="pokemonDataValue">${pokemonModal.defense}</div>
                </div>
                <div class="pokemonData">
                    <div class="pokemonDataTitle">Special Attack</div>
                    <div class="pokemonDataValue">${pokemonModal.specialAttack}</div>
                </div>
                <div class="pokemonData">
                    <div class="pokemonDataTitle">Special Defense</div>
                    <div class="pokemonDataValue">${pokemonModal.specialDefense}</div>
                </div>
                <div class="pokemonData">
                    <div class="pokemonDataTitle">Speed</div>
                    <div class="pokemonDataValue">${pokemonModal.speed}</div>
                </div>
            </div>
        </div>
    ` 
}

