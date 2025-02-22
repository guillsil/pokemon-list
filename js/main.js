const container = document.getElementById("pokemon-list");
const guilleBtn = document.getElementById("guille-btn");
const tinnBtn = document.getElementById("tinn-btn");
const favGuille = document.getElementById("fav-guille");
const favTinn = document.getElementById("fav-tinn");
const deckGuille = document.getElementById("deck-guille");
const cantidadSeleccionados = document.querySelector(".contador h3"); 
const totalCartas = document.querySelector(".contador h4");

let totalSeleccionados = 0;
let totalPokemones = 0;

const pokemonListGuille = [
    "tadbulb", "abra", "alakazam", "dragonair", "dragonite","charmeleon", "eevee", "gengar", "riolu", "metang", "trevenant", 
    "lileep", "seadra", "kingdra", "persian","weepinbell", "victreebel", "gardevoir", "gallade", "doublade", "buizel",
    "panpour","budew", "charjabug", "nacli", "hydreigon", "gimmighoul", "exeggutor", "greavard", "polteageist", "steelix",
    "revavroom", "zubat", "golbat"
];
const favoritoGuille = [
    "darkrai", "palkia", "bulbasaur", "ivysaur", "venusaur", , "articuno", "zapdos", "squirtle", "wartortle", "blastoise",
     "geodude", "graveler", "golem", "koffing", "weezing", "kangaskhan", "celebi", "snivy", "servine", "serperior", "stonjourner", 
    "voltorb", "electrode", "gible", "gabite", "garchomp", 
];
const guilleDeck = [ "melmetal", "meltan", "meltan", "revavroom", "orthworm", "orthworm", "zacian", "zacian",
    "bronzong", "bronzong", "bronzor", "bronzor"
];
const guillePartidirias = [
    "3x Nemona", "3x Roark", "2x Youngster", "1x Jacq", 
    "1x Rika", "4xGreat Ball", "3x Switch", "2x Energy Sticker",
    "2x Nest Ball", "1 Position", "19x Basic Metal Energy"
];
const favoritoTinn = [
    "squirtle", "wartortle", "snivy","servine", "serperior", "tornadus", ,"tornadus", "mudsdale", 
    "dhelmise", "gossifleur", "sobble", "arrokuda", "barraskewda", "jumpluff"
];
const pokemonListTinn = [
    "tinkatuff", "tinkaton", "flapple", "hydrapple", "roselia", "budew", "deerling", "thwackey",  "drakloak", "dragapult", 
    "pidgeotto", "pidgeot", "talonflame90", "sealeo", "walrein", "braixen", "delphox",
    "chandelure", "simisear", "honchkrow",  "grotle",
    "torterra", "amoonguss", "rowlet", "beautifly", "gogoat", "gloom",
    "vileplume", "bellossom", "smoliv", "dolliv", "arboliva", "charmeleon", "charizard", "wiglett", "toxel", "greavard", "bunnelby", "dragonair", "dragonite",
    "vivillon", "toedscool", "sandile", "primeape", "annihilape", "tandemaus", "maushold"
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

    // Renderizar Pokémon del deck
    for (const pokemon of guilleDeck) {
        try {
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

            totalPokemones++;
        } catch (error) {
            console.error(`Error obteniendo datos de ${pokemon}:`, error);
        }
    }

    // Renderizar cartas de entrenador
    const baseURL = "https://api.pokemontcg.io/v2/cards?q=name:";
    const cardPromises = guillePartidirias.map(async (cardEntry) => {
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
