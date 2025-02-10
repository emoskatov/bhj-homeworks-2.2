document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tasks__form");
  const input = document.getElementById("task__input");
  const taskList = document.getElementById("tasks__list");

  // Ключ для localStorage
  const LOCAL_STORAGE_KEY = "tasks";

  /**
   * Загружает задачи из localStorage и отображает их на странице.
   */
  const loadTasks = () => {
    const savedTasks =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    savedTasks.forEach((taskText) => addTaskToDOM(taskText));
  };

  /**
   * Сохраняет текущий список задач в localStorage.
   */
  const saveTasks = () => {
    const tasks = [...document.querySelectorAll(".task__title")].map(
      (task) => task.textContent
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  };

  /**
   * Создает новую задачу в DOM.
   * @param {string} text - Текст задачи.
   */
  const addTaskToDOM = (text) => {
    const task = document.createElement("div");
    task.className = "task";

    task.innerHTML = `
      <div class="task__title">${text}</div>
      <a href="#" class="task__remove">&times;</a>
    `;

    // Обработчик удаления задачи
    task.querySelector(".task__remove").addEventListener("click", (event) => {
      event.preventDefault();
      task.remove();
      saveTasks(); // Обновляем localStorage
    });

    taskList.appendChild(task);
  };

  /**
   * Обрабатывает добавление новой задачи.
   * @param {Event} event - Событие формы.
   */
  const handleAddTask = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const taskText = input.value.trim();
    if (taskText) {
      addTaskToDOM(taskText);
      saveTasks(); // Сохраняем изменения в localStorage
      input.value = ""; // Очищаем поле ввода
    }
  };

  // Устанавливаем обработчик отправки формы
  form.addEventListener("submit", handleAddTask);

  // Загружаем задачи из localStorage при загрузке страницы
  loadTasks();
});