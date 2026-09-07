// Datos de músculos
const musculos = [
    {
        id: 1,
        nombre: "Bíceps braquial",
        origen: "Proceso coracoideo y tubérculo supraglenoideo de la escápula",
        insercion: "Tuberosidad bicipital del radio",
        funcion: "Flexión de codo y supinación del antebrazo",
        inervacion: "Nervio musculocutáneo (C5-C6)"
    },
    {
        id: 2,
        nombre: "Tríceps braquial",
        origen: "Tubérculo infraglenoideoideo de la escápula y cara posterior del húmero",
        insercion: "Olécranon del cúbito",
        funcion: "Extensión del codo",
        inervacion: "Nervio radial (C6-C8)"
    },
    {
        id: 3,
        nombre: "Deltoides",
        origen: "Clavícula, acromion y espina de la escápula",
        insercion: "Tuberosidad deltoidea del húmero",
        funcion: "Abducción, flexión y extensión del hombro",
        inervacion: "Nervio axilar (C5-C6)"
    },
    {
        id: 4,
        nombre: "Pectoral mayor",
        origen: "Clavícula, esternón y cartílagos costales",
        insercion: "Cresta del tubérculo mayor del húmero",
        funcion: "Aducción y rotación interna del hombro",
        inervacion: "Nervio pectoral (C5-T1)"
    },
    {
        id: 5,
        nombre: "Dorsal ancho",
        origen: "Espinas dorsales, fascia toracolumbar e ilíaco",
        insercion: "Surco intertubercular del húmero",
        funcion: "Aducción, extensión y rotación interna del hombro",
        inervacion: "Nervio toracodorsal (C6-C8)"
    },
    {
        id: 6,
        nombre: "Recto abdominal",
        origen: "Cartílagos costales 5-7 y proceso xifoideo",
        insercion: "Sínfisis púbica y cresta del pubis",
        funcion: "Flexión del tronco y compresión abdominal",
        inervacion: "Nervios intercostales (T7-T12)"
    },
    {
        id: 7,
        nombre: "Oblicuo externo",
        origen: "Caras externas de las costillas 5-12",
        insercion: "Cresta ilíaca y línea alba",
        funcion: "Flexión lateral y rotación del tronco",
        inervacion: "Nervios intercostales (T7-T12)"
    },
    {
        id: 8,
        nombre: "Cuádriceps",
        origen: "Espina ilíaca anterior superior, fémur",
        insercion: "Tuberosidad anterior de la tibia",
        funcion: "Extensión de la rodilla y flexión de la cadera",
        inervacion: "Nervio femoral (L2-L4)"
    },
    {
        id: 9,
        nombre: "Isquiotibiales",
        origen: "Tuberosidad isquiática",
        insercion: "Tibia, peroné",
        funcion: "Flexión de rodilla y extensión de cadera",
        inervacion: "Nervio ciático (L5-S2)"
    },
    {
        id: 10,
        nombre: "Glúteo mayor",
        origen: "Hueso ilíaco, sacro y cóccix",
        insercion: "Tuberosidad glútea del fémur",
        funcion: "Extensión de cadera",
        inervacion: "Nervio glúteo inferior (L5-S2)"
    },
    {
        id: 11,
        nombre: "Gastrocnemio",
        origen: "Cóndilo medial y lateral del fémur",
        insercion: "Calcáneo a través del tendón de Aquiles",
        funcion: "Flexión plantar del pie",
        inervacion: "Nervio tibial (S1-S2)"
    },
    {
        id: 12,
        nombre: "Sóleo",
        origen: "Tibia y peroné",
        insercion: "Calcáneo a través del tendón de Aquiles",
        funcion: "Flexión plantar del pie",
        inervacion: "Nervio tibial (S1-S2)"
    }
];

// Variables globales
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let musculoActual = null;

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const musclesList = document.getElementById('musclesList');
const muscleModal = document.getElementById('muscleModal');
const closeBtn = document.querySelector('.close');
const favButton = document.getElementById('favButton');
const favoritesList = document.getElementById('favoritesList');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    mostrarMusculos(musculos);
    actualizarFavoritos();
    setupEventListeners();
});

// Setup de event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        const busqueda = e.target.value.toLowerCase();
        const musculosFiltrados = musculos.filter(m => 
            m.nombre.toLowerCase().includes(busqueda)
        );
        mostrarMusculos(musculosFiltrados);
    });

    closeBtn.addEventListener('click', () => {
        muscleModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === muscleModal) {
            muscleModal.style.display = 'none';
        }
    });

    favButton.addEventListener('click', toggleFavorito);
}

// Mostrar músculos en la lista
function mostrarMusculos(lista) {
    if (lista.length === 0) {
        musclesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white; padding: 20px;">No se encontraron músculos</p>';
        return;
    }

    musclesList.innerHTML = lista.map(musculo => `
        <div class="muscle-card" onclick="abrirDetalle(${musculo.id})">
            <h3>${musculo.nombre}</h3>
            <p><strong>Origen:</strong> ${musculo.origen.substring(0, 50)}...</p>
            <p><strong>Función:</strong> ${musculo.funcion.substring(0, 50)}...</p>
        </div>
    `).join('');
}

// Abrir detalle del músculo
function abrirDetalle(id) {
    musculoActual = musculos.find(m => m.id === id);
    
    if (musculoActual) {
        document.getElementById('muscleName').textContent = musculoActual.nombre;
        document.getElementById('muscleOrigin').textContent = musculoActual.origen;
        document.getElementById('muscleInsertion').textContent = musculoActual.insercion;
        document.getElementById('muscleFunction').textContent = musculoActual.funcion;
        document.getElementById('muscleInnervation').textContent = musculoActual.inervacion;

        // Actualizar botón de favorito
        const esFavorito = favoritos.some(f => f.id === musculoActual.id);
        if (esFavorito) {
            favButton.textContent = '❤️ Quitar de favoritos';
            favButton.classList.add('favorited');
        } else {
            favButton.textContent = '⭐ Agregar a favoritos';
            favButton.classList.remove('favorited');
        }

        muscleModal.style.display = 'block';
    }
}

// Toggle favorito
function toggleFavorito() {
    if (!musculoActual) return;

    const indice = favoritos.findIndex(f => f.id === musculoActual.id);
    
    if (indice > -1) {
        // Quitar de favoritos
        favoritos.splice(indice, 1);
        favButton.textContent = '⭐ Agregar a favoritos';
        favButton.classList.remove('favorited');
    } else {
        // Agregar a favoritos
        favoritos.push(musculoActual);
        favButton.textContent = '❤️ Quitar de favoritos';
        favButton.classList.add('favorited');
    }

    // Guardar en localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    actualizarFavoritos();
}

// Actualizar lista de favoritos
function actualizarFavoritos() {
    if (favoritos.length === 0) {
        favoritesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Sin favoritos aún. ¡Agrega algunos!</p>';
        return;
    }

    favoritesList.innerHTML = favoritos.map(musculo => `
        <div class="favorite-item">
            <p onclick="abrirDetalle(${musculo.id})" style="cursor: pointer;">${musculo.nombre}</p>
            <button class="remove-fav" onclick="quitarFavorito(${musculo.id})">Eliminar</button>
        </div>
    `).join('');
}

// Quitar favorito
function quitarFavorito(id) {
    favoritos = favoritos.filter(f => f.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    actualizarFavoritos();

    // Si el modal está abierto, actualizar el botón
    if (musculoActual && musculoActual.id === id) {
        favButton.textContent = '⭐ Agregar a favoritos';
        favButton.classList.remove('favorited');
    }
}
