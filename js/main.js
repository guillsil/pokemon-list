const container = document.getElementById("pokemon-list");
const guilleBtn = document.getElementById("guille-btn");
const tinnBtn = document.getElementById("tinn-btn");

const pokemonListGuille = [
    "tinkatink", "charmeleon", "raichu", "eevee", "haunter", "gengar", "riolu", "metang",
    "weepinbell", "victreebel", "kirlia", "gardevoir", "gallade", "honedge", "doublade",
    "froslass", "glalie", "buizel", "panpour", "revavroom", "remoraid", "feebas", "bramblin",
    "budew", "roselia", "charjabug", "vikavolt", "carkol", "coalossal", "nacli", "garganacl",
    "lycanroc", "thievul", "marill"
];

const pokemonListTinn = [
    "flapple", "appletun", "dipplin", "hydrapple", "carvanha", "drakloak", "dragapult", "gliscor",
    "pidgeotto", "pidgeot", "talonflame", "sealeo", "walrein", "blitzle", "braixen", "delphox",
    "lampent", "chandelure", "simisear", "skeledirge", "gumshoos", "honchkrow", "joltik", "grotle",
    "torterra", "amoonguss", "rowlet", "decidueye", "cascoon", "beautifly", "dottler", "gogoat", "clawitzer"
];

// Función para buscar el ID de un Pokémon
async function buscarId(nombre) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    const data = await response.json();
    return data.id;
}

// Función para renderizar la lista de Pokémon
async function renderizarPokemonList(lista) {
    container.innerHTML = ""; // Limpiar el contenedor antes de renderizar
    for (const pokemon of lista) {
        const id = await buscarId(pokemon);
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        const item = document.createElement("div");
        item.classList.add("pokemon-item");

        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = pokemon;

        const name = document.createElement("span");
        name.textContent = pokemon;

        const form = document.createElement("form");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        form.appendChild(checkbox);

        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(form);
        container.appendChild(item);
    }
}

// Event listeners para los botones del navbar
guilleBtn.addEventListener("click", () => renderizarPokemonList(pokemonListGuille));
tinnBtn.addEventListener("click", () => renderizarPokemonList(pokemonListTinn));

// Renderizar la lista de Tinn por defecto al cargar la página
renderizarPokemonList(pokemonListGuille);