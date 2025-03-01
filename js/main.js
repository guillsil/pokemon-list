const container = document.getElementById("pokemon-list");
const guilleBtn = document.getElementById("guille-btn");
const tinnBtn = document.getElementById("tinn-btn");
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
    "1x (abra)(151)(63)",
    "1x (Alakazam ex)(151)(65)",
    "1x (charmeleon)(Obsidian Flames)(27)",
    "1x (eevee)(Prismatic Evolutions)(74)",
    "1x (gengar)(Temporal Forces)(193)",
    "1x (persian)(151)(53)",
    "1x (weepinbell)(151)(70)",
    "1x (victreebel)(151)(71)",
    "1x (gardevoir)(Paldean Fates)(29)",
    "1x (doublade)(Paradox Rift)(132)",
    "1x (voltorb)(151)(100)",
    "1x (charjabug)(Stellar Crown)(52)",
    "1x (Hydreigon ex)(Surging Sparks)(119)",
    "1x (steelix)(Paradox Rift)(125)",
    "1x (metapod)(151)(11)",
    "1x (butterfree)(151)(12)",
    "1x (parasect)(151)(47)",
    "1x (frogadier)(Obsidian Flames)(57)",
    "1x (Sharpedo)(Obsidian Flames)(47)",
    "1x (weezing)(151)(110)",
    "1x (Yungoos)(Obsidian Flames)(176)",
    "1x (Larvitar)(Obsidian Flames)(105)",
    "1x (Tyranitar Ex)(Obsidian Flames)(66)",
    "1x (Pidgeot Ex)(Obsidian Flames)(164)",
    "1x (Machop)(151)(66)",
    "1x (Machoke)(151)(67)",
    "1x (darkrai)(Obsidian Flames)(136)",
    "1x (bulbasaur)(151)(1)",  
    "1x (ivysaur)(151)(2)",  
    "1x (Venusaur ex)(151)(3)",  
    "1x (zapdos)(151)(145)",  
    "1x (squirtle)(151)(7)",  
    "1x (wartortle)(151)(8)",  
    "1x (blastoise ex)(151)(9)",  
    "1x (geodude)(151)(74)", 
    "1x (Graveler)(151)(75)", 
    "1x (golem ex)(151)(76)",  
    "1x (kangaskhan)(Obsidian Flames)(165)", 
    "1x (celebi)(Stellar Crown)(4)", 
    "1x (stonjourner)(Scarlet & Violet)(121)",
    "1x (gible)(Paradox Rift)(94)",
    "1x (gabite)(Paradox Rift)(95)",
    "1x (garchomp ex)(Paradox Rift)(38)", 
];


const guilleDeck = [
    "2x (Bronzor)(Obsidian Flames)(144)",
    "2x (Energy Sticker)(151)(159)",
    "11x (Basic Metal Energy)(Shrouded Fable)(99)",
    "4x (Great Ball)(Paldea Evolved)(183)",
    "2x (Nest Ball)(Sun & Moon)(123)",
    "1x (Jacq)(Scarlet & Violet)(175)",
    "3x (Revavroom)(Scarlet & Violet)(142)",
    "1x (Orthworm)(Paldea Evolved)(151)",
    "2x (Roark)(Paradox Rift)(173)",
    "1x (Rika)(Paradox Rift)(172)",
    "1x (Zacian)(Paradox Rift)(136)",
];


const pokemonListTinn = [
    "1x (Amoonguss)(Obsidian Flames)(10)", 
    "1x (Applin)(Twilight Masquerade)(17)",
    "1x (Arboliva)(Obsidian Flames)(21)",  
    "1x (Bellossom)(Obsidian Flames)(3)",  
    "1x (Blitzle)(Paradox Rift)(62)", 
    "1x (Bunnelby)(Obsidian Flames)(112)", 
    "1x (Capsakid)(Obsidian Flames)(24)",  
    "1x (Chandelure)(Obsidian Flames)(38)",  
    "1x (Chandelure)(Twilight Masquerade)(38)",
    "1x (Crabominable)(Obsidian Flames)(115)",
    "1x (Cufant)(Shrouded Fable)(43)",,  
    "1x (Darmanitan)(Obsidian Flames)(35)", 
    "1x (Deerling)(Temporal Forces)(16)",  
    "1x (Dolliv)(Obsidian Flames)(20) ", 
    "1x (Donphan)(Shrouded Fable)(103)",  
    "1x (Dottler)(Obsidian Flames)(12)",  
    "1x (Drilbur)(Obsidian Flames)(111)",  
    "1x (Eelektrik)(Obsidian Flames)(68)",  
    "1x (Eevee)(Obsidian Flames)(166)",  
    "1x (Floette)(Twilight Masquerade)(87)",  
    "1x (Florges)(Twilight Masquerade)(88)",  
    "1x (Frogadier)(Obsidian Flames)(57)",  
    "1x (Gloom)(Obsidian Flames)(2)",  
    "1x (Gogoat)(Scarlet & Violet)(12)",  
    "1x (Grotle)(Temporal Forces)(11)",  
    "1x (Krookodile)(Scarlet & Violet)(117)",  
    "1x (Lampent)(Obsidian Flames)(37)",  
    "1x (Litwick)(Twilight Masquerade)(36)",  
    "1x (Melmetal)(Obsidian Flames)(153)",  
    "1x (Mudsdale)(Temporal Forces)(92)",  
    "1x (Ninetales)(Obsidian Flames)(29)",  
    "1x (Persian)(Shrouded Fable)(49)",  
    "1x (Primeape)(Scarlet & Violet)(108)",  
    "1x (Rowlet)(Obsidian Flames)(13)",  
    "1x (Sandaconda)(Scarlet & Violet)(120)",  
    "1x (Sandile)(Scarlet & Violet)(115)",  
    "1x (Sharpedo)(Obsidian Flames)(47)",  
    "1x (Simisear)(Obsidian Flames)(21)",  
    "1x (Talonflame)(Paldea Evolved)(30)",  
    "1x (Tandemaus)(Scarlet & Violet)(160)",  
    "1x (Togepi)(Obsidian Flames)(83)",  
    "1x (Togetic)(Obsidian Flames)(84)",  
    "1x (Toedscool)(Obsidian Flames)(25)",  
    "1x (Torterra ex)(Temporal Forces)(12)",  
    "1x (Tsareena)(Obsidian Flames)(18)",  
    "1x (Thwackey)(Twilight Masquerade)(15)",  
    "1x (Zebstrika)(Shrouded Fable)(63)",  
    "1x (Zigzagoon)(Obsidian Flames)(167)"

    
];



const tinnDeck = [
    "3x (kingdra EX)(Shrouded Fable)(12)",
    "2x (seadra)(Shrouded Fable)(11)",
    "2x (horsea)(Shrouded Fable)(10)",
    "1x (frigibax)(Paldea Evolved)(58)",
    "1x (arctibax)(Paldea Evolved)(59)",
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
    "5x (Basic Water Energy)(Paldea Evolved)(279)"
];

function getDeckFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("deck"); // Retorna 'guille' o 'tinn'
}

document.addEventListener("DOMContentLoaded", () => {
    const deckSeleccionado = getDeckFromURL();
    
    if (deckSeleccionado === "guille") {
        mostrarCartasSimilares(guilleDeck);
    } else if (deckSeleccionado === "tinn") {
        mostrarCartasSimilares(tinnDeck);
    }
});



// Extraer detalles de la carta en el nuevo formato
function obtenerDetallesCarta(cardEntry) {
    const regex = /(\d+)x \((.+?)\)\((.+?)\)\((.+?)\)/;
    const match = cardEntry.match(regex);

    if (!match) return null;

    return {
        cantidad: parseInt(match[1]),
        nombre: match[2],
        set: match[3],
        numero: match[4]
    };
}

// Obtener la imagen de la carta desde la API
async function obtenerImagenCarta(detalles) {
    const setId = await obtenerSetId(detalles.set);
    if (!setId) return null;

    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:\"${encodeURIComponent(detalles.nombre)}\" set.id:\"${setId}\" number:\"${detalles.numero}\"`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data.length > 0 ? data.data[0].images.large : null;
    } catch (error) {
        console.error(`Error obteniendo imagen de ${detalles.nombre}:`, error);
        return null;
    }
}

// Renderizar la lista de Pokémon con el nuevo formato
async function renderizarPokemonList(lista) {
    container.innerHTML = "";
    totalPokemones = lista.length;
    totalSeleccionados = 0;
    actualizarContador();

    for (const cardEntry of lista) {
        const detalles = obtenerDetallesCarta(cardEntry);
        if (!detalles) continue;

        const imgUrl = await obtenerImagenCarta(detalles);
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
    }
}


async function obtenerSetId(setName) {
    try {
        const response = await fetch("https://api.pokemontcg.io/v2/sets");
        const data = await response.json();

        const setEncontrado = data.data.find(set => 
            set.name.toLowerCase().includes(setName.toLowerCase())
        );

        return setEncontrado ? setEncontrado.id : null;
    } catch (error) {
        return null;
    }
}

async function obtenerCarta(nombre, set, numero) {
    const setId = await obtenerSetId(set);
    if (!setId) return null;

    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:"${encodeURIComponent(nombre)}" set.id:"${setId}" number:"${numero}"`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        return data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
        return null;
    }
}

async function mostrarCartasSimilares(deck) {
    const cartasContainer = document.getElementById("cartas-similares");
    cartasContainer.innerHTML = "";
    const favGuille = document.getElementById("fav-guille");
    const favTinn = document.getElementById("fav-tinn");
    for (const cardEntry of deck) {
        const detalles = obtenerDetallesCarta(cardEntry);
        if (!detalles) continue;

        const carta = await obtenerCarta(detalles.nombre, detalles.set, detalles.numero);
        if (!carta) continue;

        const div = document.createElement("div");
        div.classList.add("carta");
        div.innerHTML = `
            <img src="${carta.images.large}" alt="${carta.name}">
            <p>${detalles.cantidad}x ${carta.name} (${detalles.set})</p>
        `;

        cartasContainer.appendChild(div);
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


if (guilleBtn) {
    guilleBtn.addEventListener("click", () => {
        renderizarPokemonList(pokemonListGuille);
    });
}

if (deckTinn) {
    deckTinn.addEventListener("click", () => {
        renderizarCartas(tinnDeck)
    });
}

renderizarPokemonList(pokemonListGuille);
