const objetivosDiarios = [];
const objetivosSemanales = [];

function mostrarFormulario(tipo) {
    const formulario = document.getElementById('formulario-objetivo');
    const titulo = document.getElementById('formulario-titulo');
    titulo.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1) + " Objetivo";

    document.getElementById('form-objetivo').onsubmit = function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const tipoObjetivo = document.getElementById('tipo').value;

        if (tipoObjetivo === "diario") {
            objetivosDiarios.push({ nombre, tipo: "diario", tareas: [] });
            renderizarObjetivosDiarios();
        } else if (tipoObjetivo === "semanal") {
            objetivosSemanales.push({ nombre, tipo: "semanal", tareas: [] });
            renderizarObjetivosSemanales();
        }

        formulario.style.display = 'none';
    }

    formulario.style.display = 'block';
}

function renderizarObjetivosDiarios() {
    const lista = document.getElementById('lista-diarios');
    lista.innerHTML = '';
    objetivosDiarios.forEach((obj, index) => {
        const objetivoElement = document.createElement('div');
        objetivoElement.classList.add('objetivo-item');
        objetivoElement.textContent = obj.nombre;
        lista.appendChild(objetivoElement);
    });
}

function renderizarObjetivosSemanales() {
    const lista = document.getElementById('lista-semanales');
    lista.innerHTML = '';
    objetivosSemanales.forEach((obj, index) => {
        const objetivoElement = document.createElement('div');
        objetivoElement.classList.add('objetivo-item');
        objetivoElement.textContent = obj.nombre;
        lista.appendChild(objetivoElement);
    });
}

