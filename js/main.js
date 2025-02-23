const container = document.getElementById("pokemon-list");
const guilleBtn = document.getElementById("guille-btn");
const tinnBtn = document.getElementById("tinn-btn");
const favGuille = document.getElementById("fav-guille");
const favTinn = document.getElementById("fav-tinn");
const deckGuille = document.getElementById("deck-guille");
const cantidadSeleccionados = document.querySelector(".contador h3"); 
const totalCartas = document.querySelector(".contador h4");

const modal = document.createElement("div");
modal.id = "modal";
modal.innerHTML = `
    <div id="modal-content">
        <span id="close-modal">&times;</span>
        <img id="modal-img" src="" alt="Pokemon Image">
    </div>
`;
document.body.appendChild(modal);

let totalSeleccionados = 0;
let totalPokemones = 0;

const pokemonListGuille = [
    "tadbulb", "abra", "alakazam", "dragonair", "dragonite","charmeleon", "eevee", "gengar", "riolu", "metang",
     "kingdra", "persian","weepinbell", "victreebel", "gardevoir", "gallade", "doublade", "buizel",
    "panpour", "voltorb", "budew", "charjabug", "nacli", "hydreigon", "gimmighoul", "exeggutor", "steelix", "metapod", "butterfree", 
    "parasect", "tangrowth", "frogadier", "greninja", "wiglett", "Hihidaruma", "quagsire", "sharpedo", "masquerain",
    "medicham"
];
const favoritoGuille = [
    "darkrai", "bulbasaur", "ivysaur", "venusaur", , "articuno", "zapdos", "squirtle", "wartortle", "blastoise",
     "geodude", "graveler", "golem", "koffing", "weezing", "kangaskhan", "celebi", "snivy", "servine", "serperior", "stonjourner",
     "gible", "gabite", "garchomp", 
];

const guilleDeck = [
    "1x zacian", "2x bronzong", "1x bronzor", ,"2x Roark", "1x Jacq", 
    "1x Rika", "4xGreat Ball", "2x Energy Sticker",
    "2x Nest Ball", "11x Basic Metal Energy"
];

const pokemonListTinn = [
    "tinkatuff", "tinkaton", "flapple", "hydrapple", "roselia", "budew", "deerling", "thwackey",  "drakloak", "dragapult", 
    "pidgeotto", "pidgeot", "talonflame90", "sealeo", "walrein", "braixen", "delphox",
    "chandelure", "simisear",  "grotle",
    "torterra", "amoonguss", "rowlet", "beautifly", "gogoat", "gloom",
    "vileplume", "bellossom", "dolliv", "arboliva", "charmeleon", "charizard", "toxel", "bunnelby", "dragonair", "dragonite",
    "vivillon", "toedscool", "sandile", "primeape", "annihilape", "tandemaus", "maushold", "scizor", "scovillain", "armarouge",
    "ceruledge", "pawmi", "pawmo", "eelektrik", "melmetal", "zigzagoon"
];

const favoritoTinn = [
    "squirtle", "wartortle", "snivy","servine", "serperior", "mudsdale", 
    "gossifleur", "sobble", "arrokuda", "barraskewda", "jumpluff"
];

const tinnDeck = [
    "1x zacian", "2x bronzong", "1x bronzor", ,"2x Roark", "1x Jacq", 
    "1x Rika", "4xGreat Ball", "2x Energy Sticker",
    "2x Nest Ball", "11x Basic Metal Energy"
];

// Función para buscar el ID de un Pokémon
async function buscarId(nombre) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`); // Convertimos a minúsculas para evitar errores
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
        try {
            const id = await buscarId(pokemon);
            const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            const item = document.createElement("div");
            item.classList.add("pokemon-item");

            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = pokemon;
            img.addEventListener("click", () => mostrarImagen(imgUrl));

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
        } catch (error) {
            console.error(`Error obteniendo datos de ${pokemon}:`, error);
        }
    }
}

// Función para actualizar el contador en la pantalla
function actualizarContador() {
    cantidadSeleccionados.textContent = `Cantidad de Pokemones Seleccionados: ${totalSeleccionados}`;
    totalCartas.textContent = `Total de Cartas: ${totalPokemones}`;
}

function mostrarImagen(imgUrl) {
    document.getElementById("modal-img").src = imgUrl;
    modal.style.display = "block";
}

document.getElementById("close-modal").addEventListener("click", () => {
    modal.style.display = "none";
});

// Event listeners para los botones del navbar
guilleBtn.addEventListener("click", () => {
    renderizarPokemonList(pokemonListGuille);
});

tinnBtn.addEventListener("click", () => {
    renderizarPokemonList(pokemonListTinn);
});

favGuille.addEventListener("click", () => {
    renderizarPokemonList(favoritoGuille)
});

favTinn.addEventListener("click", () => {
    renderizarPokemonList(favoritoTinn)
});

// Evento para renderizar el deck de Guille con cartas adicionales
deckGuille.addEventListener("click", async () => {
    container.innerHTML = ""; // Limpiar el contenedor antes de renderizar
    totalPokemones = 0; 
    totalSeleccionados = 0; 
    actualizarContador();

    // Renderizar cartas de entrenador
    const baseURL = "https://api.pokemontcg.io/v2/cards?q=name:";
    const cardPromises = guilleDeck.map(async (cardEntry) => {
        const [count, ...nameParts] = cardEntry.split("x ");
        const name = nameParts.join("x ").trim();
        
        try {
            const response = await fetch(`${baseURL}"${name}"`);
            const data = await response.json();
            
            if (data?.data?.length > 0) {
                const card = data.data[0];

                const item = document.createElement("div");
                item.classList.add("pokemon-item");

                const img = document.createElement("img");
                img.src = card.images.large;
                img.alt = name;
                img.addEventListener("click", () => mostrarImagen(img.src));

                const title = document.createElement("h4");
                title.textContent = `${count}x ${name}`;

                item.appendChild(img);
                item.appendChild(title);
                container.appendChild(item);

                totalPokemones++;
            } else {
                console.warn(`Carta no encontrada: ${name}`);
            }
        } catch (error) {
            console.error(`Error obteniendo carta ${name}:`, error);
        }
    });

    await Promise.all(cardPromises);

    actualizarContador();
});


// Renderizar la lista de Guille por defecto al cargar la página
renderizarPokemonList(pokemonListGuille);
