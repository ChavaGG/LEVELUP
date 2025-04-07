// Variables globales para almacenar los objetivos
let dailyObjectives = JSON.parse(localStorage.getItem('dailyObjectives')) || [];
let weeklyObjectives = JSON.parse(localStorage.getItem('weeklyObjectives')) || [];

// Función para mostrar la vista correspondiente
function showTab(tab) {
  const content = document.getElementById('content');
  
  switch (tab) {
    case 'daily':
      content.innerHTML = renderDailyObjectives();
      break;
    case 'weekly':
      content.innerHTML = renderWeeklyObjectives();
      break;
    case 'history':
      content.innerHTML = renderHistory();
      break;
    case 'summary':
      content.innerHTML = renderSummary();
      break;
    case 'manage':
      content.innerHTML = renderManageObjectives();
      break;
    default:
      content.innerHTML = '<h2>Error: Vista no encontrada.</h2>';
      break;
  }
}

// Función para marcar una tarea como completada
function markTaskAsComplete(taskId, objectiveId) {
  const objective = dailyObjectives.find(o => o.id === objectiveId);
  const task = objective.tasks.find(t => t.id === taskId);
  task.completed = true;
  
  // Guardar cambios en el localStorage
  saveDailyObjectives();

  // Actualizar la vista
  showTab('daily');
}

// Renderizar los objetivos diarios
function renderDailyObjectives() {
  let html = '<h2>Objetivos del Día</h2>';
  html += '<ul>';
  
  dailyObjectives.forEach(objective => {
    html += `<li>
      <h3>${objective.name}</h3>
      <div>Progreso: ${getProgress(objective)}%</div>
      <ul>`;
    
    objective.tasks.forEach(task => {
      html += `<li>
        <span>${task.name}</span>
        ${!task.completed ? `<button onclick="markTaskAsComplete('${task.id}', '${objective.id}')">Marcar como completado</button>` : '<span>Completado</span>'}
      </li>`;
    });
    
    html += '</ul></li>';
  });

  html += '</ul>';
  return html;
}

// Función para calcular el progreso de un objetivo
function getProgress(objective) {
  const totalTasks = objective.tasks.length;
  const completedTasks = objective.tasks.filter(task => task.completed).length;
  return (completedTasks / totalTasks) * 100;
}

// Verificar el nuevo día
function checkNewDay() {
  const lastCheckedDate = localStorage.getItem('lastCheckedDate');
  const currentDate = new Date().toISOString().split('T')[0]; // Solo fecha sin la hora

  if (lastCheckedDate !== currentDate) {
    // Si es un nuevo día, actualiza el objetivo
    localStorage.setItem('lastCheckedDate', currentDate);
    // Lógica para actualizar el objetivo del día aquí
    dailyObjectives = []; // Este es solo un ejemplo
    saveDailyObjectives();
  }
}

// Llamar a la función al cargar la página
checkNewDay();
