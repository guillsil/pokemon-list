const container = document.getElementById("pokemon-list");
const guilleBtn = document.getElementById("guille-btn");
const tinnBtn = document.getElementById("tinn-btn");
const favGuille = document.getElementById("fav-guille");
const favTinn = document.getElementById("fav-tinn");
const deckGuille = document.getElementById("deck-guille");
const deckTinn = document.getElementById("deck-tinn");
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
    "2x (Bronzong)(Obsidian Flames)(145)",
    "2x (Bronzor)(Obsidian Flames)(144)",
    "2x (Energy Sticker)(151)(159)",
    "11x (Basic Metal Energy)(Shrouded Fable)(99)",
    "4x (Great Ball)(Paldea Evolved)(183)",
    "2x (Nest Ball)(Sun & Moon)(123)",
    "1x (Jacq)(Scarlet & Violet)(175)",

    "2x (Roark)(ParadoxRift)(173)",
    "1x (Rika)(ParadoxRift)(172)",
    "1x (Zacian)(ParadoxRift)(136)",
    
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
    "3x (kingdra EX)(Shrouded Fable)(12)",
    "3x (seadra)(Shrouded Fable)(11)",
    "3x (horsea)(Shrouded Fable)(10)",
    "2x (frigibax)(Paldea Evolved)(58)",
    "2x (arctibax)(Paldea Evolved)(59)",
    "2x (baxcalibur)(Paldea Evolved)(60)",
    "3x (Chien-Pao ex)(Paldea Evolved)(61)",
    "3x (Lapras)(Paldean Fates)(16)",
    "1x (Geeta)(Obsidian Flames)(188)",
    "2x (Boss's Orders)(Paldea Evolved)(172)",
    "2x (Super Rod)(Paldea Evolved)(188)",
    "3x (Rare Candy)(Paldean Fates)(89)",
    "4x (Superior Energy Retrieval)(Paldea Evolved)(189)",
    "2x (Cycling Road)(151)(157)",
    "4x (Nest Ball)(Paldean Fates)(84)",
    "4x (Ultra Ball)(Paldean Fates)(91))",
    "11x (Basic Water Energy)(Paldea Evolved)(279)"
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

async function obtenerSetId(setName) {
    try {
        const response = await fetch("https://api.pokemontcg.io/v2/sets");
        const data = await response.json();

        const setEncontrado = data.data.find(set => set.name.toLowerCase() === setName.toLowerCase());
        return setEncontrado ? setEncontrado.id : null;
    } catch (error) {
        console.error(`Error obteniendo el ID del set ${setName}:`, error);
        return null;
    }
}

async function renderizarCartas(lista) {
    container.innerHTML = "";
    totalPokemones = 0;
    totalSeleccionados = 0;
    actualizarContador();

    // Crear los elementos sin esperar la API
    const elementosCarta = lista.map((cardEntry) => {
        const [count, cardDetails] = cardEntry.split("x ");
        const detailsString = cardDetails.trim();
        const regex = /\((.+?)\)\((.+?)\)\((.+?)\)/;
        const match = detailsString.match(regex);

        if (!match) {
            console.warn(`Formato de carta incorrecto: ${detailsString}`);
            return null;
        }

        const name = match[1].trim();
        const set = match[2].trim();
        const number = match[3].trim();

        // Crear un contenedor de carta antes de la carga
        const item = document.createElement("div");
        item.classList.add("pokemon-item");

        const img = document.createElement("img");
        img.src = "loading.gif"; // Imagen temporal mientras carga
        img.alt = name;

        const title = document.createElement("h4");
        title.textContent = `${count}x ${name} (${set}) ${number}`;

        item.appendChild(img);
        item.appendChild(title);
        container.appendChild(item);

        return { item, img, name, set, number };
    });

    // Ahora hacer las solicitudes fetch en paralelo
    const cardPromises = elementosCarta.map(async ({ item, img, name, set, number }) => {
        if (!item) return;

        const setId = await obtenerSetId(set);
        if (!setId) {
            console.warn(`No se encontró el ID del set para: ${set}`);
            return;
        }

        const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:"${encodeURIComponent(name)}" set.id:"${setId}" number:"${number}"`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data?.data?.length > 0) {
                const card = data.data[0];
                img.src = card.images.large; // Reemplazar la imagen cuando se cargue
            } else {
                console.warn(`Carta no encontrada: ${name} (${set}) ${number}`);
                img.src = "not_found.png"; // Imagen de "no encontrado"
            }
        } catch (error) {
            console.error(`Error obteniendo carta ${name}:`, error);
            img.src = "error.png"; // Imagen de error
        }
    });

    await Promise.all(cardPromises);
    actualizarContador();
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

deckGuille.addEventListener("click", async () => {
    await renderizarCartas(guilleDeck); // Asegura que se espere la ejecución
});

deckTinn.addEventListener("click", async () => {
    await renderizarCartas(tinnDeck)
});


// Renderizar la lista de Guille por defecto al cargar la página
renderizarPokemonList(pokemonListGuille);
