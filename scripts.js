const add_btn = document.querySelector('#add-btn');
const task_input = document.querySelector('#task-input');
const ul_tasks = document.querySelector('.tasks-ul');
const filter_tasks = document.querySelector('#filter-tasks');
const f_all = document.querySelector('#f-all');
const f_compl = document.querySelector('#f-compl');
const f_active = document.querySelector('#f-active');
const filter_ul = document.querySelector('.filters ul');
const filters_block = document.querySelector('.filters');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function createTask(task) {
    const div = document.createElement('div');
    const checkbox = document.createElement('input');
    const li = document.createElement('li');
    const del_btn = document.createElement('button');
    const edit_btn = document.createElement('button');
    const important_btn = document.createElement('button');
    const div_btns = document.createElement('div');

    li.textContent = task.txt;
    checkbox.type = 'checkbox';
    del_btn.textContent = "Delete";
    edit_btn.textContent = "Edit";
    important_btn.textContent = "Important";
    div_btns.append(del_btn, edit_btn, important_btn);

    div.style.cssText = `
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        margin-top: 25px;
        width: 700px;
        height: 60px;
        background-color: white;
        padding: 10px;
        border-radius: 10px;
        overflow: hidden;
    `;

    checkbox.style.cssText = `
        width: 15px;
        height: 15px;
        margin-top: 10px;
    `;

    div_btns.style.cssText = `
        gap: 20px;
        margin-left: auto;
    `;

    [edit_btn, important_btn].forEach((btn) => {
        btn.style.marginLeft = '15px';
    });

    important_btn.style.marginRight = '10px';

    div.append(checkbox, li, div_btns);
    ul_tasks.appendChild(div);

    if (task.important) {
        div.style.backgroundColor = "#b11717e6";
        li.style.color = '#fff';
        li.style.fontSize = '30px';
        li.style.fontWeight = '700';
    }

    if (task.cmplt) {
        checkbox.checked = true;
        div.style.textDecoration = 'line-through';
        div.style.backgroundColor = "#a8a8a8ff";
        li.style.fontSize = '25px';
        li.style.fontWeight = '400';
        li.style.color = '#000';
        [checkbox, edit_btn, important_btn].forEach((btn) => btn.disabled = true);
        make_filter();
    }

    del_btn.addEventListener('click', () => {
        ul_tasks.removeChild(div);
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    edit_btn.addEventListener('click', () => {
        task_input.value = task.txt;
        ul_tasks.removeChild(div);
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    important_btn.addEventListener('click', () => {
        task.important = true;
        div.style.backgroundColor = "#b11717e6";
        li.style.color = '#fff';
        li.style.fontSize = '30px';
        li.style.fontWeight = '700';
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    checkbox.addEventListener('change', () => {
        task.cmplt = true;
        div.style.textDecoration = 'line-through';
        div.style.backgroundColor = "#a8a8a8ff";
        li.style.fontSize = '25px';
        li.style.fontWeight = '400';
        li.style.color = '#000';
        [checkbox, edit_btn, important_btn].forEach((btn) => btn.disabled = true);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        make_filter();
    });
}


let filter = 'all'; 

function make_filter() {
    [...ul_tasks.children].forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (filter == 'all') item.style.display = 'flex';
        else if (filter == 'completed') item.style.display = checkbox.checked ? 'flex' : 'none';
        else if (filter == 'active') item.style.display = !checkbox.checked ? 'flex' : 'none';
    });
}

filters_block.addEventListener('mouseenter', () => {
    filter_ul.style.display = 'flex';
});

filters_block.addEventListener('mouseleave', () => {
    setTimeout(() => filter_ul.style.display = 'none', 700)
});

f_all.addEventListener('click', () => {
    filter = 'all';
    make_filter();
});

f_compl.addEventListener('click', () => { 
    filter = 'completed'; 
    make_filter(); 
});

f_active.addEventListener('click', () => { 
    filter = 'active'; 
    make_filter(); 
});


tasks.forEach(task => createTask(task));
make_filter();


add_btn.addEventListener('click', e => {
    e.preventDefault();
    if (task_input.value.trim() == '') {
        alert('You did not write task');
        return;
    }

    const task = { 
        txt: task_input.value, 
        important: false, 
        cmplt: false 
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    createTask(task);
    task_input.value = '';
    make_filter(); 
});



