
// fetch the pokemon data this can be name or number 
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

        const pokemonData = await response.json();
        console.log("Pokemon Found!");
        return pokemonData;
    } catch (error) {
        console.error("Invalid Pokemon Found!");
    }
}

// From the data collected, display the Pokemon Data
async function displayPokemonData(pokemonName, isShiny) {
    const data = await fetchPokemonData(pokemonName);
    const dataInfoElement = document.getElementById('dataInfo');

    if (data) {


        
        // have a look at the checkbox value to tell us to display the shiny sprite or not
        const sprite = isShiny ? data.sprites.front_shiny : data.sprites.front_default;

        // make an new variable for types as it can be more than one
        const types = data.types

        // get the array item make sure the first letter is capitalised then combine with any other types
        .map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1))
        .join(', '); 
            
        dataInfoElement.innerHTML = `
            <h1>It's.... ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}!</h1>
            <img src="${sprite}" alt="${data.name}" class="img-fluid mb-4" style="max-width: 400px;">
            <h2>Type: ${types}</h2>
            <br>
        `;
    } else {
        dataInfoElement.innerHTML = `<h1>NOT FOUND >:(</h1>`;
        }
}



// Form submission handler to get the name and display the data
document.getElementById('pokemonForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const isShiny = document.getElementById('myShinyCheckbox').checked;
    const pokemonName = document.getElementById('pokemonName').value.trim();

    if (pokemonName) {
        displayPokemonData(pokemonName, isShiny);
    } else {
        console.log("Please enter a Pokémon name.");
    }
});
