// Variable global para almacenar datos (para simplificar).
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
  localStorage.setItem('dailyObjectives', JSON.stringify(dailyObjectives));

  // Actualizar la vista
  showTab('daily');
}

// Renderizar objetivos diarios
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

// Renderizar otros tab (semanales, historial, etc.)
// Funciones como renderWeeklyObjectives(), renderHistory(), etc., siguen una estructura similar a renderDailyObjectives().
