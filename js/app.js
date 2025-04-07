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
      <h3>${objective.name} 
        <button onclick="editObjective('${objective.id}')">Editar</button> 
        <button onclick="deleteObjective('${objective.id}')">Eliminar</button>
      </h3>
      <div>Progreso: ${getProgress(objective)}%</div>
      <ul>`;
    
    objective.tasks.forEach(task => {
      html += `<li>
        <span>${task.name}</span>
        ${!task.completed ? `<button onclick="markTaskAsComplete('${task.id}', '${objective.id}')">Marcar como completado</button>` : '<span>Completado</span>'}
        <button onclick="editTask('${task.id}', '${objective.id}')">Editar tarea</button>
        <button onclick="deleteTask('${task.id}', '${objective.id}')">Eliminar tarea</button>
      </li>`;
    });
    
    html += '</ul><button onclick="addTask('${objective.id}')">Agregar tarea</button></li>';
  });

  html += '</ul>';
  html += '<button onclick="addObjective()">Agregar objetivo</button>';
  return html;
}

// Función para calcular el progreso de un objetivo
function getProgress(objective) {
  const totalTasks = objective.tasks.length;
  const completedTasks = objective.tasks.filter(task => task.completed).length;
  return (completedTasks / totalTasks) * 100;
}

// Función para agregar un nuevo objetivo
function addObjective() {
  const objectiveName = prompt('Ingrese el nombre del objetivo:');
  const newObjective = {
    id: Date.now().toString(),
    name: objectiveName,
    tasks: []
  };

  dailyObjectives.push(newObjective);
  saveDailyObjectives();
  showTab('daily');
}

// Función para editar un objetivo
function editObjective(objectiveId) {
  const objective = dailyObjectives.find(o => o.id === objectiveId);
  const newName = prompt('Editar nombre del objetivo:', objective.name);
  if (newName) {
    objective.name = newName;
    saveDailyObjectives();
    showTab('daily');
  }
}

// Función para eliminar un objetivo
function deleteObjective(objectiveId) {
  dailyObjectives = dailyObjectives.filter(o => o.id !== objectiveId);
  saveDailyObjectives();
  showTab('daily');
}

// Función para agregar una tarea
function addTask(objectiveId) {
  const taskName = prompt('Ingrese el nombre de la tarea:');
  const newTask = {
    id: Date.now().toString(),
    name: taskName,
    completed: false
  };

  const objective = dailyObjectives.find(o => o.id === objectiveId);
  objective.tasks.push(newTask);
  saveDailyObjectives();
  showTab('daily');
}

// Función para editar una tarea
function editTask(taskId, objectiveId) {
  const objective = dailyObjectives.find(o => o.id === objectiveId);
  const task = objective.tasks.find(t => t.id === taskId);
  const newName = prompt('Editar nombre de la tarea:', task.name);
  if (newName) {
    task.name = newName;
    saveDailyObjectives();
    showTab('daily');
  }
}

// Función para eliminar una tarea
function deleteTask(taskId, objectiveId) {
  const objective = dailyObjectives.find(o => o.id === objectiveId);
  objective.tasks = objective.tasks.filter(t => t.id !== taskId);
  saveDailyObjectives();
  showTab('daily');
}

// Guardar objetivos diarios
function saveDailyObjectives() {
  localStorage.setItem('dailyObjectives', JSON.stringify(dailyObjectives));
}

// Guardar objetivos semanales
function saveWeeklyObjectives() {
  localStorage.setItem('weeklyObjectives', JSON.stringify(weeklyObjectives));
}
