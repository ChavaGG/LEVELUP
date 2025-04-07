// --- VARIABLES Y ELEMENTOS ---
const objetivos = JSON.parse(localStorage.getItem('objetivos')) || [];

const resumenTab = document.getElementById("resumen");
const diariosTab = document.getElementById("diarios");
const semanalesTab = document.getElementById("semanales");
const editarTab = document.getElementById("editar");

const diaSemanaSelect = document.getElementById("dia-semana");
const nuevoObjetivoInput = document.getElementById("nuevo-objetivo");
const tipoObjetivoSelect = document.getElementById("tipo-objetivo");
const agregarObjetivoBtn = document.getElementById("agregar-objetivo");

const templateObjetivo = document.createElement("template");
templateObjetivo.innerHTML = `
    <div class="objetivo">
        <h3 class="objetivo-nombre"></h3>
        <div class="tareas">
            <input type="text" class="nueva-tarea" placeholder="Nueva tarea">
            <button class="agregar-tarea">Agregar Tarea</button>
        </div>
        <div class="tareas-list"></div>
        <button class="eliminar-objetivo">Eliminar Objetivo</button>
    </div>
`;

// --- FUNCIONES DE PESTAÑAS ---
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.remove('hidden');
    renderizar();
  });
});
document.querySelector('[data-tab="resumen"]').click();

function guardar() {
  localStorage.setItem('objetivos', JSON.stringify(objetivos));
}

function renderizar() {
  renderResumen();
  renderDiarios();
  renderSemanales();
  renderEditar();
}

function renderResumen() {
  resumenTab.innerHTML = '';
  objetivos.forEach(obj => {
    const clon = templateObjetivo.content.cloneNode(true);
    clon.querySelector(".objetivo-nombre").textContent = obj.nombre;
    resumenTab.appendChild(clon);
  });
}

function renderDiarios() {
  diariosTab.innerHTML = '';
  const dia = diaSemanaSelect.value;
  objetivos
    .filter(o => o.tipo === 'diario' && o.dia === dia)
    .forEach(obj => {
      const clon = templateObjetivo.content.cloneNode(true);
      clon.querySelector(".objetivo-nombre").textContent = obj.nombre;
      diariosTab.appendChild(clon);
    });
}

function renderSemanales() {
  semanalesTab.innerHTML = '';
  objetivos
    .filter(o => o.tipo === 'semanal')
    .forEach(obj => {
      const clon = templateObjetivo.content.cloneNode(true);
      clon.querySelector(".objetivo-nombre").textContent = obj.nombre;
      semanalesTab.appendChild(clon);
    });
}

function renderEditar() {
  editarTab.innerHTML = '';
  objetivos.forEach(obj => {
    const clon = templateObjetivo.content.cloneNode(true);
    clon.querySelector(".objetivo-nombre").textContent = obj.nombre;
    editarTab.appendChild(clon);
  });
}

agregarObjetivoBtn.onclick = () => {
  const nombre = nuevoObjetivoInput.value.trim();
  const tipo = tipoObjetivoSelect.value;
  if (!nombre) return alert("Debes escribir un nombre.");
  const nuevo = { nombre, tipo, tareas: [] };
  if (tipo === "diario") nuevo.dia = diaSemanaSelect.value;
  objetivos.push(nuevo);
  nuevoObjetivoInput.value = '';
  tipoObjetivoSelect.value = 'diario';
  guardar();
  renderizar();
};

