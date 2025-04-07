// Funciones para manejar el almacenamiento
function saveDailyObjectives() {
  localStorage.setItem('dailyObjectives', JSON.stringify(dailyObjectives));
}

function saveWeeklyObjectives() {
  localStorage.setItem('weeklyObjectives', JSON.stringify(weeklyObjectives));
}
