let items = [];
let boughtAtBottom = true;

const inputItem = document.getElementById('inputItem');
const listContainer = document.getElementById('listContainer');
const btnAdd = document.getElementById('btnAdd');
const btnClear = document.getElementById('btnClear');
const btnToggleSort = document.getElementById('btnToggleSort');

function render() {
    items.sort((a, b) => {
        if (a.bought === b.bought) {
            return a.name.localeCompare(b.name);
        }
        return boughtAtBottom ? a.bought - b.bought : b.bought - a.bought;
    });

    listContainer.innerHTML = '';

    items.forEach((item, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        
        span.textContent = item.name;

        if (item.bought) {
            li.classList.add('bought');
            span.textContent = "✔ " + item.name;
        }

        li.appendChild(span);

        if (!item.bought) {
            const btnDelete = document.createElement('button');
            btnDelete.textContent = 'Eliminar';
            btnDelete.className = 'btn-delete';
            btnDelete.onclick = (e) => {
                e.stopPropagation();
                deleteItem(index);
            };
            li.appendChild(btnDelete);
        }

        li.onclick = () => toggleBought(index);
        listContainer.appendChild(li);
    });
}

function addItem() {
    const text = inputItem.value.trim();

    if (text === '') return;
    
    const exists = items.some(item => item.name === text);
    if (exists) {
        alert('El producto ya está en la lista.');
        return;
    }

    items.push({
        name: text,
        bought: false
    });
    
    inputItem.value = '';
    inputItem.focus();
    render();
}

function deleteItem(index) {
    items.splice(index, 1);
    render();
}

function toggleBought(index) {
    items[index].bought = !items[index].bought;
    render();
}

function clearList() {
    items = [];
    render();
}

function toggleSortOrder() {
    boughtAtBottom = !boughtAtBottom;
    render();
}

function handleEnterKey(event) {
    if (event.key === 'Enter') addItem();
}

btnAdd.addEventListener('click', addItem);
btnClear.addEventListener('click', clearList);
btnToggleSort.addEventListener('click', toggleSortOrder);
inputItem.addEventListener('keyup', handleEnterKey);

render();