// Función para obtener los objetivos desde el localStorage o inicializarlos
function getObjectives(type) {
  const objectives = localStorage.getItem(type);
  return objectives ? JSON.parse(objectives) : [];
}

// Función para guardar los objetivos en el localStorage
function saveObjectives(type, objectives) {
  localStorage.setItem(type, JSON.stringify(objectives));
}

// Guardar objetivos diarios
function saveDailyObjectives() {
  saveObjectives('dailyObjectives', dailyObjectives);
}

// Guardar objetivos semanales
function saveWeeklyObjectives() {
  saveObjectives('weeklyObjectives', weeklyObjectives);
}
