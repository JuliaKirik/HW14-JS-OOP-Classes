class TodoList {
    constructor(el) {
      this.todos = [];
      this.el = el;
      this.list = document.getElementById('list');
      el.addEventListener('click', (event) => {
        if (event.target.classList.contains("set-status")) {
            this.changeStatus(event.target.closest('li').getAttribute('data-id'));
        } else if (event.target.classList.contains("delete-task")) {
            this.removeTodo(event.target.closest('li').getAttribute('data-id'))
        } else if (event.target.classList.contains("addItem")) {
            let valueInput = document.getElementById('input').value;
            this.addTodo(new Task(valueInput, false));
        } else if (event.target.classList.contains("find")) {
            let valueInput = document.getElementById('input').value;
            this.findTask(valueInput);
        }
      })
    }
    addTodo(todo) {
      this.todos.push(todo);
      this.render();
    }
    removeTodo(id) {
        console.log(document.querySelector(`[data-id="${id}"]`));
      let element = document.querySelector(`[data-id="${id}"]`).remove();
      this.todos = this.todos.filter((el) => {
        return el.id !== id;
      });
    }
    getTodos() {
      return this.todos;
    }
    changeStatus(id) {
      let index = this.todos.findIndex((el) => el.id === id);
      this.todos[index].status = !this.todos[index].status;
      let element = document.querySelector(`[data-id="${id}"]`);
      element.classList.toggle('done');
    }
    findTask(value) {
        let result = this.todos.filter((el) => el.value.includes(value));
        this.list.innerHTML = this.renderList(result);
    }
    render() {
        this.list.innerHTML = this.renderList(this.todos);
    }
    renderList(array) {
        let lis = '';
        for (let el of array) {
                if (!el) {
                return;
            }
            lis += `<li data-id="${el.id}" class="in-progress">${el.value}<button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
        }
        return lis;
    }
  }

  class Task {
    constructor(value, status) {
      this.value = value;
      this.status = status;
      this.id = Math.random().toString(36).substr(2, 9);
    }
  }
  
  let list = document.getElementById('list-wrap');
  let todo1 = new TodoList(list);
  todo1.addTodo(new Task('9345', true));
  todo1.addTodo(new Task('2945hv', false));
  console.log(todo1.getTodos());
  todo1.render();