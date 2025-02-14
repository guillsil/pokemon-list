const container = document.getElementById("pokemon-list");
const guilleBtn = document.getElementById("guille-btn");
const tinnBtn = document.getElementById("tinn-btn");
const cantidadSeleccionados = document.querySelector(".contador h3"); 
const totalCartas = document.querySelector(".contador h4");

let totalSeleccionados = 0;
let totalPokemones = 0;

const pokemonListGuille = [
    "tinkatink", "charmeleon", "eevee", "magikarp",  "haunter", "gengar", "riolu", "haxorus", "metang", "makuhita",
    "weepinbell", "victreebel", "gardevoir", "gallade", "doublade", "buizel", "panpour", "feebas",
    "budew", "roselia", "charjabug", "thievul", "nacli", "garganacl", 
    
];

const pokemonListTinn = [
    "flapple", "appletun", "hydrapple", "sharpedo", "roselia", "Budew", "stufful", "deerling", "thwackey",  "drakloak", "dragapult", "gliscor",
    "pidgeotto", "pidgeot", "talonflame", "sealeo", "walrein", "braixen", "delphox",
    , "chandelure", "simisear", "skeledirge", "honchkrow", "joltik", "grotle",
    "torterra", "amoonguss", "rowlet", "decidueye", "cascoon", "beautifly", "dottler", "gogoat"
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
    totalPokemones = lista.length; // Guardar el total de cartas
    totalSeleccionados = 0; // Reiniciar contador de seleccionados
    actualizarContador(); // Actualizar la UI con los valores actuales

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

        // Evento para actualizar contador cuando se selecciona un Pokémon
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                totalSeleccionados++;
            } else {
                totalSeleccionados--;
            }
            actualizarContador();
        });

        form.appendChild(checkbox);
        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(form);
        container.appendChild(item);
    }
}

// Función para actualizar el contador en la pantalla
function actualizarContador() {
    cantidadSeleccionados.textContent = `Cantidad de Pokemones Seleccionados: ${totalSeleccionados}`;
    totalCartas.textContent = `Total de Cartas: ${totalPokemones}`;
}


// Event listeners para los botones del navbar
guilleBtn.addEventListener("click", () => renderizarPokemonList(pokemonListGuille));
tinnBtn.addEventListener("click", () => renderizarPokemonList(pokemonListTinn));

// Renderizar la lista de Guille por defecto al cargar la página
renderizarPokemonList(pokemonListGuille);