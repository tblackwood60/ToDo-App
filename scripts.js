const add_btn = document.querySelector('#add-btn');
const task_input = document.querySelector('#task-input');
const ul_tasks = document.querySelector('.tasks-ul');

add_btn.addEventListener('click', e => {
    if (task_input.value.trim() == '') {
        alert('You did not write task')
    } else {
        e.preventDefault();
        const div = document.createElement('div');
        const checkbox = document.createElement('input');
        const li = document.createElement('li');
        const del_btn = document.createElement('button');
        const edit_btn = document.createElement('button');
        const important_btn = document.createElement('button');
        const div_btns = document.createElement('div');

        li.textContent = task_input.value;
        task_input.value = '';
        checkbox.type = 'checkbox';
        del_btn.textContent = "Delete";
        edit_btn.textContent = "Edit";
        important_btn.textContent = "Important"

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


        del_btn.addEventListener('click', () => {
            ul_tasks.removeChild(div);
        })

        edit_btn.addEventListener('click', () => {
            let txt = li.textContent;
            task_input.value = txt;
            ul_tasks.removeChild(div);
        })

        important_btn.addEventListener('click', () => {
            div.style.backgroundColor = "#b11717e6";
            li.style.color = '#fff';
            li.style.fontSize = '30px';
            li.style.fontWeight = '700';
        })

        checkbox.addEventListener('change', () => {
            div.style.textDecoration = 'line-through';
            div.style.backgroundColor = "#a8a8a8ff";
            li.style.fontSize = '25px';
            li.style.fontWeight = '400';
            li.style.color = '#000';
            [checkbox, edit_btn, important_btn].forEach((btn) => {
                btn.disabled = true;
            })
        })
    }
    
})





