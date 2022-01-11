
const todoForm = document.querySelector('#form-todo');
const author = document.getElementById('author');
//console.log('author ' , author);
const post = document.getElementById('post');
// const todoBtn = document.querySelector('.todo__btn');
const list = document.querySelector('.todo__list');
const todoTitle = document.querySelector('.todo__title');
const counter = document.querySelector('.todo__count');


const base = {
        init() {
            this.todo = this.getTodoLS();
        },

        employee: 'Петров Сергей Иванович',
        todo: [],
        check(id) {
            for (let i = 0; i < this.todo.length; i++ ) {
                if(this.todo[i].id == id) {
                    this.todo[i].ready = true;
                }
            }
            this.setTodoLS();
        },
        addTodo(author, post) {
            const todo = {
                id: 'td' + (Date.now()),
                author,
                post,
                ready: false,
            };

            this.todo.push(todo)
            this.setTodoLS();
            return todo;
        },
        getTodoLS() {
            if(localStorage.getItem('todo')) {
                return JSON.parse(localStorage.getItem('todo'))
            }

            return [];
        },
        setTodoLS() {
            localStorage.setItem('todo', JSON.stringify(this.todo))
        },
        getCount() {
            return this.todo.length;
        }
        
    };

    const addTodo = event => {
        event.preventDefault();

        const authorText = author.value;
        const postText = post.value;
        
        const objTodo = base.addTodo(authorText, postText);
        const todoLi = createTodo(objTodo);

        list.append(todoLi)
        counter.innerHTML = base.getCount();
        todoForm.reset();
    };

    const createTodo = ({ ready, author, post, id }) => { 
        
        
        const todoItem = `
            <article class="post ${ready ? 'post_complete' : ''}">
                <h3 class="post__author">${author}</h3>
                <p class="post__todo">${post}</p>
                ${!ready ? `<button class="post__ready" type="button" data-id="${id}">✔</button>` : ''}
                
            </article>`;

        const li = document.createElement('li');
        li.classList.add('todo__list-item');
        li.innerHTML = todoItem;

        return li;
    };

    const renderTodo = () => {
        base.init();
        for (let i = 0; i < base.todo.length; i++) {
            const todoLi = createTodo(base.todo[i]);
            list.append(todoLi);
        }
        counter.innerHTML = base.getCount(); 
    };

    const checkTodo = event => {
        const btn = event.target.closest('.post__ready');
        
        if(btn) {
            const post = btn.closest('.post');
            btn.remove();
            post.classList.add('post_complete');
            const id = btn.dataset.id;
            base.check(id)
        }
    };

    todoForm.addEventListener('submit', addTodo);
    list.addEventListener('click', checkTodo);

    renderTodo();




    // калькулятор

    const calcPlus = document.querySelector('.plus');
    const calcMinus = document.querySelector('.minus');
    const calcProizvedenie = document.querySelector('.proizvedenie');
    const calcDelenie = document.querySelector('.delenie');
    const inputOne = document.getElementById('x');
    const inputSecond = document.getElementById('y');
    const result = document.querySelector('.calc__result');

    calcPlus.addEventListener('click', (event) => {
      const resultPlus = (+inputOne.value + +inputSecond.value).toFixed(2);
      result.innerHTML = resultPlus;
    });

    calcMinus.addEventListener('click', (event) => {
      const resultMinus = (+inputOne.value - +inputSecond.value);
      result.innerHTML = resultMinus.toFixed(2);
    });
    
      calcProizvedenie.addEventListener('click', (event) => {
      const resultProizvedenie = (+inputOne.value * +inputSecond.value);
      result.innerHTML = resultProizvedenie.toFixed(2);
    });

      calcDelenie.addEventListener('click', (event) => {
      const resultDelenie = (+inputOne.value / +inputSecond.value);
      result.innerHTML = resultDelenie.toFixed(2);
    });
      
      
