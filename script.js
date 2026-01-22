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

class ItemList {
    constructor(parent) {
        this.items = [];
        this.parent = parent;
        this.boughtAtBottom = true;
    }

    add(name) {
        if (name === '') return;

        const existingItem = this.items.find(item => item.name === name);
        if (existingItem) {
            alert('El producto ya está en la lista.');
            return;
        }

        const newItem = new Item(name);
        this.items.push(newItem);
        this.render();
    }

    remove(item) {
        this.items = this.items.filter(x => x !== item);
        this.render();
    }

    clear() {
        this.items = [];
        this.render();
    }

    toggleSortOrder() {
        this.boughtAtBottom = !this.boughtAtBottom;
        this.render();
    }

    render() {
        this.items.sort((a, b) => {
            if (a.purchased === b.purchased) {
                return a.name.localeCompare(b.name);
            }
            return this.boughtAtBottom ? a.purchased - b.purchased : b.purchased - a.purchased;
        });

        this.parent.innerHTML = '';

        this.items.forEach(item => {
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
                    item.subtract();
                    if (item.count <= 0) {
                        this.remove(item);
                    } else {
                        this.render();
                    }
                };

                const btnPlus = document.createElement('button');
                btnPlus.textContent = '+';
                btnPlus.className = 'btn-sort btn-sm';
                btnPlus.onclick = (e) => {
                    e.stopPropagation();
                    item.add();
                    this.render();
                };

                controlsDiv.appendChild(btnMinus);
                controlsDiv.appendChild(btnPlus);
                li.appendChild(controlsDiv);
            }

            li.onclick = () => {
                item.toggle();
                this.render();
            };

            this.parent.appendChild(li);
        });
    }
}

const inputItem = document.getElementById('inputItem');
const listContainer = document.getElementById('listContainer');
const btnAdd = document.getElementById('btnAdd');
const btnClear = document.getElementById('btnClear');
const btnToggleSort = document.getElementById('btnToggleSort');

const myShoppingList = new ItemList(listContainer);

function handleAddItem() {
    const text = inputItem.value.trim();
    myShoppingList.add(text);
    inputItem.value = '';
    inputItem.focus();
}

btnAdd.addEventListener('click', handleAddItem);

btnClear.addEventListener('click', () => {
    myShoppingList.clear();
});

btnToggleSort.addEventListener('click', () => {
    myShoppingList.toggleSortOrder();
});

inputItem.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') handleAddItem();
});

myShoppingList.render();