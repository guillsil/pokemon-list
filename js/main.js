const container = document.getElementById("pokemon-list");
const guilleBtn = document.getElementById("guille-btn");
const tinnBtn = document.getElementById("tinn-btn");
const deckGuille = document.getElementById("deck-guille");
const deckGuilleMoon = document.getElementById("deck-guille-moon");
const deckTinn = document.getElementById("deck-tinn");
const cantidadSeleccionados = document.querySelector(".contador h3");
const totalCartas = document.querySelector(".contador h4");


let totalSeleccionados = 0;
let totalPokemones = 0;

// Todas las listas de cartas y decks
const decks = {
    guille: [
        "1x (Energy Sticker)(151)(159)",
        "4x (Great Ball)(Paldea Evolved)(183)",
        "2x (Nest Ball)(Sun & Moon)(123)",
        "1x (Revavroom)(Scarlet & Violet)(142)",
        "2x (Zacian)(Paradox Rift)(136)",
    ],
    tinn: [
        "1x (kingdra EX)(Shrouded Fable)(12)",
        "2x (Chien-Pao ex)(Paldea Evolved)(61)",
        "1x (Super Rod)(Paldea Evolved)(188)",
        "3x (Rare Candy)(Paldean Fates)(89)",
        "2x (Superior Energy Retrieval)(Paldea Evolved)(189)",
        "3x (Nest Ball)(Paldean Fates)(84)",
        "6x (Basic Water Energy)(Paldea Evolved)(279)"
    ],
    deckMoon: [
        "1x (Boss’s Orders)(Paldea Envolved)(172)",
        "2x (Counter Catcher)(Paradox Rift)(160)",
        "1x (Nest Ball)(Scarlet & Violet)(181)",
        "1x (Pal Pad)(Scarlet & Violet)(182)",
        "3x (Pokégear 3,0)(Scarlet & Violet)(186)",
        "1x (Super Rod)(Paldea Evolved)(188)",
        "1x (Superior Energy Retrieval)(Paldea Evolved)(189)",
    ]
};

const pokemonLists = {
    guille: [
        "1x (Alakazam ex)(151)(65)",
        "1x (gengar)(Temporal Forces)(193)",
        "1x (persian)(151)(53)",
        "1x (weepinbell)(151)(70)",
        "1x (victreebel)(151)(71)",
        "1x (gardevoir)(Paldean Fates)(29)",
        "1x (charjabug)(Stellar Crown)(52)",
        "1x (Hydreigon ex)(Surging Sparks)(119)",
        "1x (steelix)(Paradox Rift)(125)",
        "1x (metapod)(151)(11)",
        "1x (parasect)(151)(47)",
        "1x (Sharpedo)(Obsidian Flames)(47)",
        "1x (weezing)(151)(110)",
        "1x (Yungoos)(Obsidian Flames)(176)",
        "1x (Tyranitar Ex)(Obsidian Flames)(66)",
        "1x (Pidgeot Ex)(Obsidian Flames)(164)",
        "1x (darkrai)(Obsidian Flames)(136)",
        "1x (Venusaur ex)(151)(3)",  
        "1x (zapdos)(151)(145)",  
        "1x (squirtle)(151)(7)",  
        "1x (wartortle)(151)(8)",  
        "1x (blastoise ex)(151)(9)",  
        "1x (golem ex)(151)(76)",  
        "1x (kangaskhan)(Obsidian Flames)(165)", 
        "1x (celebi)(Stellar Crown)(4)", 
        "1x (stonjourner)(Scarlet & Violet)(121)",
        "1x (garchomp ex)(Paradox Rift)(38)",
    ],
    tinn: [
        "1x (Amoonguss)(Obsidian Flames)(10)", 
        "1x (Applin)(Twilight Masquerade)(17)",
        "1x (Arboliva)(Obsidian Flames)(21)",  
        "1x (Bellossom)(Obsidian Flames)(3)",  
        "1x (Blitzle)(Paradox Rift)(62)", 
        "1x (Bunnelby)(Obsidian Flames)(175)", 
        "1x (Capsakid)(Obsidian Flames)(24)",  
        "1x (Chandelure)(Obsidian Flames)(38)",  
        "1x (Chandelure)(Twilight Masquerade)(38)",
        "1x (Crabominable)(Obsidian Flames)(115)",
        "1x (Deerling)(Temporal Forces)(16)",  
        "1x (Dolliv)(Obsidian Flames)(20) ", 
        "1x (Donphan)(Surging Sparks)(103)",  
        "1x (Dottler)(Paradox Rift)(11)",  
        "1x (Drilbur)(Obsidian Flames)(111)",  
        "1x (Eelektrik)(Obsidian Flames)(68)",     
        "1x (Florges)(Twilight Masquerade)(88)",  
        "1x (Frogadier)(Obsidian Flames)(57)",  
        "1x (Gloom)(Obsidian Flames)(2)",  
        "1x (Gogoat)(Scarlet & Violet)(12)",  
        "1x (Grotle)(Temporal Forces)(11)",  
        "1x (Krookodile)(Scarlet & Violet)(117)",  
        "1x (Lampent)(Obsidian Flames)(37)",  
        "1x (Litwick)(Twilight Masquerade)(36)",  
        "1x (Melmetal)(Obsidian Flames)(153)",    
        "1x (Ninetales)(Obsidian Flames)(29)",  
        "1x (Persian)(Shrouded Fable)(49)",  
        "1x (Primeape)(Scarlet & Violet)(108)",  
        "1x (Rowlet)(Obsidian Flames)(13)",  
        "1x (Sandaconda)(Scarlet & Violet)(120)",  
        "1x (Sandile)(Scarlet & Violet)(115)",  
        "1x (Sharpedo)(Obsidian Flames)(47)",  
        "1x (Simisear)(Obsidian Flames)(21)",    
        "1x (Tandemaus)(Scarlet & Violet)(160)",  
        "1x (Togepi)(Obsidian Flames)(83)",  
        "1x (Togetic)(Obsidian Flames)(84)",  
        "1x (Toedscool)(Obsidian Flames)(25)",  
        "1x (Torterra ex)(Temporal Forces)(12)",  
        "1x (Tsareena)(Obsidian Flames)(18)",  
        "1x (Thwackey)(Twilight Masquerade)(15)",  
        "1x (Zebstrika)(Shrouded Fable)(63)",  
        "1x (Zigzagoon)(Obsidian Flames)(167)"
    ],
};

// Caché de imágenes en memoria
const cacheImagenes = {};

// Guardar en almacenamiento local
function guardarCacheLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Cargar desde almacenamiento local
function cargarCacheLocal(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Extraer detalles de la carta
function obtenerDetallesCarta(cardEntry) {
    const regex = /(\d+)x \((.+?)\)\((.+?)\)\((.+?)\)/;
    const match = cardEntry.match(regex);
    if (!match) return null;
    return {
        cantidad: parseInt(match[1]),
        nombre: match[2],
        set: match[3],
        numero: match[4],
    };
}

// Obtener la imagen de la carta (con caché)
async function obtenerImagenCarta(detalles) {
    const cacheKey = `${detalles.nombre}-${detalles.set}-${detalles.numero}`;
    const cacheLocal = cargarCacheLocal(cacheKey);
    if (cacheLocal) return cacheLocal;

    const setId = await obtenerSetId(detalles.set);
    if (!setId) return null;

    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:"${encodeURIComponent(detalles.nombre)}" set.id:"${setId}" number:"${detalles.numero}"`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imgUrl = data.data.length > 0 ? data.data[0].images.large : null;
        if (imgUrl) {
            cacheImagenes[cacheKey] = imgUrl;
            guardarCacheLocal(cacheKey, imgUrl);
        }
        return imgUrl;
    } catch (error) {
        console.error(`Error obteniendo imagen de ${detalles.nombre}:`, error);
        return null;
    }
}

// Precargar imágenes para una lista de cartas
async function precargarImagenes(lista) {
    const cartasPromises = lista.map(async (cardEntry) => {
        const detalles = obtenerDetallesCarta(cardEntry);
        if (!detalles) return null;
        const imgUrl = await obtenerImagenCarta(detalles);
        if (imgUrl) {
            const img = new Image();
            img.src = imgUrl;
        }
    });
    await Promise.all(cartasPromises);
}

// Renderizar cualquier lista de cartas
async function renderizarPokemonList(lista) {
    container.innerHTML = "";
    totalPokemones = lista.length;
    totalSeleccionados = 0;
    actualizarContador();
    const cartasPromises = lista.map(async (cardEntry) => {
        const detalles = obtenerDetallesCarta(cardEntry);
        if (!detalles) return null;
        const imgUrl = await obtenerImagenCarta(detalles);
        return { detalles, imgUrl };
    });
    const cartas = await Promise.all(cartasPromises);
    cartas.forEach(({ detalles, imgUrl }) => {
        if (!detalles) return;
        const item = document.createElement("div");
        item.classList.add("pokemon-item");
        const img = document.createElement("img");
        img.src = imgUrl || "placeholder.jpg";
        img.alt = detalles.nombre;
        img.addEventListener("click", () => mostrarImagen(imgUrl));
        const name = document.createElement("span");
        name.textContent = `${detalles.cantidad}x ${detalles.nombre} (${detalles.set})`;
        const form = document.createElement("form");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            totalSeleccionados += checkbox.checked ? 1 : -1;
            actualizarContador();
        });
        form.appendChild(checkbox);
        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(form);
        container.appendChild(item);
    });
}

// Obtener ID del set
async function obtenerSetId(setName) {
    try {
        const response = await fetch("https://api.pokemontcg.io/v2/sets");
        const data = await response.json();
        const setEncontrado = data.data.find((set) =>
            set.name.toLowerCase().includes(setName.toLowerCase())
        );
        return setEncontrado ? setEncontrado.id : null;
    } catch (error) {
        return null;
    }
}

// Actualizar contador
function actualizarContador() {
    cantidadSeleccionados.textContent = `Cantidad de Pokemones Seleccionados: ${totalSeleccionados}`;
    totalCartas.textContent = `Total de Cartas: ${totalPokemones}`;
}

// Event listeners
if (guilleBtn) guilleBtn.addEventListener("click", () => renderizarPokemonList(pokemonLists.guille));
if (tinnBtn) tinnBtn.addEventListener("click", () => renderizarPokemonList(pokemonLists.tinn));
if (deckGuille) deckGuille.addEventListener("click", () => renderizarPokemonList(decks.guille));
if (deckTinn) deckTinn.addEventListener("click", () => renderizarPokemonList(decks.tinn));
if (deckGuilleMoon) deckGuilleMoon.addEventListener("click", () => renderizarPokemonList(decks.deckMoon));
