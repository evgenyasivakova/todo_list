const form = document.querySelector('.top-line');
const body = document.querySelector('.middle-line');
const searchField = document.querySelector('[name="search-field"]');
const tasks = [];

form.onsubmit = function(e) {
  e.preventDefault();

  const inputField = form.querySelector('[name="title"]');
  const title = inputField.value;

  const textareaField = form.querySelector('[name="description"]');
  const content = textareaField.value;

  form.reset();

  const task = {
    title: title,
    content: content,
    status: false,
  }
  
  tasks.push(task);

  renderHtml(tasks);
}

function renderHtml(tasks) {
  body.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const createdMarkup = createTask(tasks[i], i);
    body.appendChild(createdMarkup);
  }
}

function createTask(task, index) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  wrapper.appendChild(checkbox);
  checkbox.checked = task.status;
  checkbox.onchange = function() {
    tasks[index].status = !tasks[index].status;
  }

  const tagForTitle = document.createElement('h3');
  wrapper.appendChild(tagForTitle);
  tagForTitle.textContent = task.title;

  const tagForContent = document.createElement('p');
  wrapper.appendChild(tagForContent);
  tagForContent.textContent = task.content;

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn-delete');
  wrapper.appendChild(btnDelete);
  btnDelete.textContent = 'Удалить';
  btnDelete.onclick = function() {
    tasks.splice(index, 1);
    renderHtml(tasks);
  }
  return wrapper;
}

searchField.oninput = function() {
  const searchedPhrase = searchField.value.toLowerCase();

  const filteredTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    const taskTitle = tasks[i].title.toLowerCase();

    if (taskTitle.includes(searchedPhrase)) {
      filteredTasks.push(tasks[i]);
    }
  }
  renderHtml(filteredTasks);
}
