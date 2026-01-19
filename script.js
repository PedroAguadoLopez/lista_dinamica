class Item {
    constructor(name) {
        this.name = name;
        this.purchased = false;
        this.count = 1;
    }

    toggle() {
        this.purchased = !this.purchased;
    }

    add() {
        this.count++;
    }

    subtract() {
        this.count--;
    }
}

let items = [];
let boughtAtBottom = true;

const inputItem = document.getElementById('inputItem');
const listContainer = document.getElementById('listContainer');
const btnAdd = document.getElementById('btnAdd');
const btnClear = document.getElementById('btnClear');
const btnToggleSort = document.getElementById('btnToggleSort');

function render() {
    items.sort((a, b) => {
        if (a.purchased === b.purchased) {
            return a.name.localeCompare(b.name);
        }
        return boughtAtBottom ? a.purchased - b.purchased : b.purchased - a.purchased;
    });

    listContainer.innerHTML = '';

    items.forEach((item, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        
        span.textContent = `${item.name} (x${item.count})`;

        if (item.purchased) {
            li.classList.add('bought');
            span.textContent = "✔ " + span.textContent;
        }

        li.appendChild(span);

        if (!item.purchased) {
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'item-controls';

            const btnMinus = document.createElement('button');
            btnMinus.textContent = '-';
            btnMinus.className = 'btn-secondary btn-sm';
            btnMinus.onclick = (e) => {
                e.stopPropagation();
                decreaseItemCount(index);
            };

            const btnPlus = document.createElement('button');
            btnPlus.textContent = '+';
            btnPlus.className = 'btn-sort btn-sm'; 
            btnPlus.onclick = (e) => {
                e.stopPropagation();
                increaseItemCount(index);
            };

            controlsDiv.appendChild(btnMinus);
            controlsDiv.appendChild(btnPlus);
            li.appendChild(controlsDiv);
        }

        li.onclick = () => togglePurchased(index);
        listContainer.appendChild(li);
    });
}

function addItem() {
    const text = inputItem.value.trim();

    if (text === '') return;
    
    const existingItem = items.find(item => item.name === text);
    
    if (existingItem) {
        alert('El producto ya está en la lista.');
        return;
    }

    const newItem = new Item(text);
    items.push(newItem);
    
    inputItem.value = '';
    inputItem.focus();
    render();
}

function increaseItemCount(index) {
    items[index].add();
    render();
}

function decreaseItemCount(index) {
    items[index].subtract();
    
    if (items[index].count <= 0) {
        items.splice(index, 1);
    }
    
    render();
}

function togglePurchased(index) {
    items[index].toggle();
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