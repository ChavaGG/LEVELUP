document.addEventListener('DOMContentLoaded', () => {
  const objetivos = JSON.parse(localStorage.getItem('objetivos')) || [];

  // Referencias a elementos DOM
  const resumenTab = document.getElementById("resumen");
  const diariosTab = document.getElementById("diarios");
  const semanalesTab = document.getElementById("semanales");
  const unicosTab = document.getElementById("unicos");
  const editarTab = document.getElementById("editar");

  const agregarObjetivoBtn = document.getElementById("agregar-objetivo");
  const resetBtn = document.getElementById("reset-btn");

  const nuevoObjetivoInput = document.getElementById("nuevo-objetivo");
  const tipoObjetivoSelect = document.getElementById("tipo-objetivo");
  const diaObjetivoSelect = document.getElementById("dia-seleccionado");

  const templateObjetivo = document.getElementById("template-objetivo");
  const templateTarea = document.getElementById("template-tarea");

  // Función para cambiar de pestaña
  function cambiarPestana(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    tab.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });

    document.getElementById(tab.dataset.tab).classList.add('active');
  }

  // Cargar objetivos
  function cargarObjetivos() {
    resumenTab.innerHTML = '<p>Resumen de progreso: ' + objetivos.length + ' objetivos creados.</p>';
  }

  // Agregar un nuevo objetivo
  agregarObjetivoBtn.addEventListener('click', () => {
    const objetivo = {
      nombre: nuevoObjetivoInput.value,
      tipo: tipoObjetivoSelect.value,
      dia: diaObjetivoSelect.value,
      tareas: []
    };
    objetivos.push(objetivo);
    localStorage.setItem('objetivos', JSON.stringify(objetivos));
    cargarObjetivos();
  });

  // Resetear progreso
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('objetivos');
    cargarObjetivos();
  });

  // Eventos de pestañas
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => cambiarPestana(btn));
  });

  cargarObjetivos(); // Inicializar
});
