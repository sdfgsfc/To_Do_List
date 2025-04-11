/***********************************************
 * TO-DO LIST
 ***********************************************/

// 1. Sélection des éléments du DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// 2. Tableau pour stocker les tâches en mémoire
//    Chaque tâche est un objet : { id, text, completed }
let tasks = [];

/***********************************************
 * RÉCUPÉRER LES TÂCHES AU DÉMARRAGE
 * Si localStorage contient déjà des tâches,
 * on initialise 'tasks' avec celles-ci
 ***********************************************/
const savedTasks = localStorage.getItem('myTasks');
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}

/***********************************************
 * FONCTION PRINCIPALE : AFFICHER LES TÂCHES
 * Parcourt le tableau 'tasks' pour créer les
 * éléments <li> correspondants dans le DOM
 ***********************************************/
function renderTasks() {
  // Vider la liste pour éviter les doublons
  taskList.innerHTML = '';

  // Pour chaque tâche, créer un <li> + contenu
  tasks.forEach(task => {
    const li = document.createElement('li');

    // Span pour le texte de la tâche
    const span = document.createElement('span');
    span.textContent = task.text;

    // Si la tâche est marquée comme terminée, ajouter un style
    if (task.completed) {
      span.classList.add('task-completed');
    }

    // Au clic sur le texte, on inverse l'état completed
    span.addEventListener('click', () => {
      task.completed = !task.completed;
      // Mettre à jour l'affichage
      renderTasks();
      // Mettre à jour le localStorage
      saveTasksToLocalStorage();
    });

    // Bouton de suppression de la tâche
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Suppr';
    deleteBtn.addEventListener('click', () => {
      // Filtrer la tâche cliquée hors du tableau
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
      saveTasksToLocalStorage();
    });

    // Assembler les éléments <span> et <button> dans <li>
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Ajouter le <li> à la liste <ul> principale
    taskList.appendChild(li);
  });
}

/***********************************************
 * ENREGISTRER LES TÂCHES DANS LOCALSTORAGE
 ***********************************************/
function saveTasksToLocalStorage() {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
}

/***********************************************
 * AJOUTER UNE TÂCHE
 * Au clic du bouton, on crée un nouvel objet tâche
 * et on le pousse dans 'tasks'
 ***********************************************/
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    // Crée une nouvelle tâche
    const newTask = {
      id: Date.now(),    // identifiant unique
      text: taskText,
      completed: false
    };
    // Ajoute au tableau 'tasks'
    tasks.push(newTask);
    // Mets à jour l'affichage
    renderTasks();
    // Sauvegarde dans localStorage
    saveTasksToLocalStorage();
    // Vide le champ de saisie
    taskInput.value = '';
  }
});

/***********************************************
 * INITIALISATION : ON REND LA LISTE À L'ÉCRAN
 ***********************************************/
renderTasks();
