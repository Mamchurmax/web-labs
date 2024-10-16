const permits = [
    {
        "from_to_location": "Hamburg to Frankfurt",
        "desc": "some text",
        "img": "../assets/imgs/road.jpg",
        "price": 120
    },
    {
        "from_to_location": "Berlin to Munich",
        "desc": "some text",
        "img": "../assets/imgs/road.jpg",
        "price": 150
    },
    {
        "from_to_location": "Cologne to Dusseldorf",
        "desc": "some text",
        "img": "../assets/imgs/road.jpg",
        "price": 200
    },
    {
        "from_to_location": "Stuttgart to Nuremberg",
        "desc": "some text",
        "img": "../assets/imgs/road.jpg",
        "price": 130
    },
    {
        "from_to_location": "Leipzig to Dortmund",
        "desc": "some text",
        "img": "../assets/imgs/road.jpg",
        "price": 180
    }
]
let permitsArray = [...permits];
let edited_array = null

const addPermitsToPage = (array) => {
    const itemsWrapper = document.getElementById('ItemsWrappper');
    const template = document.querySelector('.item-template');

    let child = itemsWrapper.firstChild;
    while (child) {
        const nextSibling = child.nextSibling;
        if (child.nodeType === 1 && child.tagName.toLowerCase() === 'div') {
            itemsWrapper.removeChild(child);
        }
        child = nextSibling;
    }

    array.forEach(permit => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.picture').style.backgroundImage = `url(${permit.img})`;
        clone.querySelector('.h3').textContent = permit.from_to_location;
        clone.querySelector('.h6').textContent = permit.desc;
        clone.querySelector('h6').textContent = `${permit.price}$`;

        itemsWrapper.appendChild(clone);
    });

    addRemoveEventListeners();
    addEditEventListeners();
}

function filterPermits(searchTerm) {
    return permits.filter(permit =>
        permit.from_to_location.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
}

function calculateTotalPrice() {
    const totalPrice = permitsArray.reduce((sum, permit) => sum + permit.price, 0);
    document.getElementById('total_price').textContent = `${totalPrice.toString()} $`;
}

function sortByCategory(sortBy) {
    if (sortBy === 'Price(Low to High)') {
        return permitsArray.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Name A-Z') {
        return permitsArray.slice().sort((a, b) => a.from_to_location.localeCompare(b.from_to_location));
    } else if (sortBy === 'Name Z-A') {
        return permitsArray.slice().sort((a, b) => b.from_to_location.localeCompare(a.from_to_location));
    }
}
function removePermit(permitFromTo) {
    permitsArray = permitsArray.filter(permit => permit.from_to_location !== permitFromTo);
    updatePermits();
}

function editPermit(permitFromTo){
    document.querySelector('.overlay').classList.toggle('target');

    const permit = permitsArray.find(permit => permit.from_to_location === permitFromTo);
    edited_array = permitsArray.findIndex(permit => permit.from_to_location === permitFromTo);
    if (permit) {
        const inputs = document.querySelectorAll('.create-form input');
        const textarea = document.querySelector('.create-form textarea');

        inputs[0].value = permit.from_to_location;
        inputs[1].value = permit.desc;
        inputs[2].value = permit.price;
        textarea.value = permit.img;
    }
    else{
        console.log('Permit not found');
    }
}


function addRemoveEventListeners() {
    document.querySelectorAll('.remove-permit').forEach(button => {
        button.addEventListener('click', function(event) {
            const permitFromTo = event.target.closest('.item').querySelector('.h3').textContent;
            removePermit(permitFromTo);
        });
    });
}

function addEditEventListeners() {
    document.querySelectorAll('.edit-permit').forEach(button => {
        button.addEventListener('click', function(event) {
            const permitFromTo = event.target.closest('.item').querySelector('.h3').textContent;
            editPermit(permitFromTo);
        });
    });
}

function updatePermits() {
    const searchTerm = document.querySelector('.search-menu input').value.trim();
    const selectedValue = document.getElementById('sort').value;

    let filteredPermits = searchTerm ? filterPermits(searchTerm) : permitsArray;
    let permitsToDisplay = selectedValue !== 'Choose one...' ? sortByCategory(selectedValue, filteredPermits) : filteredPermits;

    addPermitsToPage(permitsToDisplay);
}

function createPermit() {
    const inputsData = document.querySelectorAll('.create-form input');
    const textareaData = document.querySelector('.create-form textarea').value;
    const inputValues = Array.from(inputsData).map(input => input.value);
    inputValues[2] = inputsData[2].files[0];

    if (permitsArray.some(permit => permit.from_to_location === inputValues[0])) {
        document.querySelector('.error').innerHTML = 'name should be unique';
        return null;
    }

    if (inputValues[2]) {
        inputValues[2] = URL.createObjectURL(inputValues[2]);
        document.querySelector('.error').innerHTML = '';
    }
    else {
        document.querySelector('.error').innerHTML = 'u should add image';
        return null;
    }




    return {
        "from_to_location": inputValues[0],
        "desc": textareaData,
        "img": inputValues[2],
        "price": Number(inputValues[1])
    }
}

document.querySelector('.search-menu form').addEventListener('submit', function(event) {
    event.preventDefault();
    let filteredPermits;
    const searchTerm = event.target.querySelector('input').value;
    if (searchTerm !== '') {
        filteredPermits = filterPermits(searchTerm);
        permitsArray = filteredPermits;
    }
    else {
        permitsArray = permits;
        filteredPermits = permits;
    }

    const selected_value = document.getElementById('sort').value
    if (selected_value !== 'Choose one...') {
        addPermitsToPage(sortByCategory(selected_value))
    }
    else {
        addPermitsToPage(filteredPermits);
    }
});

document.querySelector('.clear').addEventListener('click', function(event) {
    event.preventDefault()
    document.querySelector('.search-menu input').value = '';
    permitsArray = permits;


    const selected_value = document.getElementById('sort').value
    if (selected_value !== 'Choose one...') {
        addPermitsToPage(sortByCategory(selected_value))
    }
    else {
        addPermitsToPage(permits);
    }

});

document.getElementById('sort').addEventListener('change', function(event) {
    const sortBy = event.target.value;

    addPermitsToPage(sortByCategory(sortBy));
});

document.querySelector('.item-count-button').addEventListener('click', function(event) {
    event.preventDefault();
    calculateTotalPrice();
});


document.querySelector('.create-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newPermit = createPermit();

    if (newPermit === null) {
        return;
    }

    if (edited_array === null) {
        permitsArray = [newPermit, ...permitsArray];
    }
    else {
        newPermit.img = permitsArray[edited_array].img;
        permitsArray[edited_array] = newPermit;
        edited_array = null;
    }

    addPermitsToPage(permitsArray);
    document.querySelector('.overlay').classList.remove('target');
    updatePermits();

    // Reset the form inputs and textarea
    document.querySelector('.create-form').reset();

});

document.querySelector('.create-button').addEventListener('click', function(event) {
    document.querySelector('.overlay').classList.toggle('target');

});

document.querySelector('.close').addEventListener('click', function(event) {
    document.querySelector('.overlay').classList.remove('target');

});

addPermitsToPage(permitsArray);
