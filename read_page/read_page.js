window.addEventListener("load", addPermitsToPage);
let count_button = document.getElementById('item-count');
let reset_button = document.getElementById('reset-button');
let sort_value = document.getElementById('sort');
let search_form = document.getElementById('search-form');
let create_button = document.getElementById('create-button');
let submit_create = document.getElementById('submit-create-button');

search_form.addEventListener('submit', function(event) {
    event.preventDefault();
    addPermitsToPage();
});
count_button.addEventListener('click', countPrices);
reset_button.addEventListener('click', () => {
    setTimeout(() => {
        addPermitsToPage();
    }, 100);
});
sort_value.addEventListener('change', addPermitsToPage);
create_button.addEventListener('click',  createTransportation);
document.querySelector('.close').addEventListener('click', function(event) {
    document.querySelector('.overlay').classList.remove('target');
});

function getTransportations(search, sort) {
    let url;
    search = search.toLowerCase().trim();
    if (sort && search) {
        url = `http://localhost:3000/transportation/?search=${search}&sort=${sort}`;
    } else if (sort) {
        url = `http://localhost:3000/transportation/?sort=${sort}`;
    } else if (search) {
        url = `http://localhost:3000/transportation/?search=${search}`;
    } else {
        url = `http://localhost:3000/transportation/`;
    }


    return fetch(url, {
        method: 'GET'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to fetch reminders');
            }
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getTransportationById(id) {
    return fetch(`http://localhost:3000/transportation/${id}`, {
        method: 'GET'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to fetch reminder');
            }
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deleteTransportation(id) {
    return fetch(`http://localhost:3000/transportation/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to delete reminder');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createTransportationEndpoint(data) {
    return fetch('http://localhost:3000/transportation/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 201) {
                return response.text().then(text => text ? JSON.parse(text) : {});
            } else if (response.status === 409) {
                throw new Error('Transportation already exists');
            } else {
                return response.text().then(text => {
                    console.error('Failed to create transportation:', text);
                    throw new Error('Failed to create transportation');
                });
            }
        })
        .catch(error => {
            return { error: error.message };
        });
}

function updateTransportationEndpoint(data) {
    return fetch(`http://localhost:3000/transportation/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status === 200) {
                return { success: true };
            } else {
                throw new Error('Failed to update reminder');
            }
        })
        .catch(error => {
            return { error: error.message };
        });
}

function countPrice(ids) {
    return fetch('http://localhost:3000/transportation/sum-prices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: ids })
    })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Failed to count price');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// Додає дозволи на сторінку
function addPermitsToPage() {
    const itemsWrapper = document.getElementById('ItemsWrappper');
    const template = document.getElementById('item-template');
    const search = document.getElementById('search-value').value;
    const sort = document.getElementById('sort').value;

    console.log(sort);
    console.log(search);

    itemsWrapper.innerHTML = ''; // Очищаємо попередні дозволи

    getTransportations(search, sort).then(data => {
        data.forEach(permit => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.picture').style.backgroundImage = `url(${permit.img})`;
            clone.getElementById('id').textContent = permit.id;
            clone.getElementById('title').textContent = permit.from_to;
            clone.getElementById('description').textContent = permit.description;
            clone.getElementById('price').textContent = `${permit.price} $`;

            clone.querySelector('.edit-permit').addEventListener('click', editTransportation, this);
            clone.getElementById('delete-button').addEventListener('click', deleteElement, this);

            itemsWrapper.appendChild(clone);
        });
    });

}

function countPrices() {
    const items = document.querySelectorAll('#id');
    const ids = [];
    for (let item of items) {
        ids.push(Number(item.textContent)); // Convert text content to number
    }
    countPrice(ids).then(data => {
        document.getElementById('total-price').innerText = data;

    });
}

function deleteElement(elem) {
    elem = elem.srcElement
    let element = elem.parentNode.parentNode;
    let id = element.querySelector("#id").innerText / 1;
    deleteTransportation(id).then(data => {
        addPermitsToPage();
    });
}

function createTransportation() {
    document.querySelector('.overlay').classList.toggle('target');
    submit_create.addEventListener('click', handleCreateTransportation);
}

function handleCreateTransportation() {
    const title = document.getElementById('title-modal').value;
    const description = document.getElementById('description-modal').value;
    const price = document.getElementById('price-modal').value;
    const newPermit = {
        from_to: title.trim(),
        description: description.trim(),
        price: Number(price),
    };

    createTransportationEndpoint(newPermit).then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            addPermitsToPage();
            document.getElementById('title-modal').value = '';
            document.getElementById('description-modal').value = '';
            document.getElementById('price-modal').value = '';
            document.querySelector('.overlay').classList.remove('target');
            submit_create.removeEventListener('click', handleCreateTransportation);
        }
    });
}

function editTransportation(elem) {
    elem = elem.srcElement;
    let element = elem.parentNode.parentNode;
    let id = element.querySelector("#id").innerText / 1;
    submit_create.addEventListener('click', updateTransportation);
    getTransportationById(id).then(data => {
        document.getElementById('id-modal').value = data.id;
        document.getElementById('title-modal').value = data.from_to;
        document.getElementById('description-modal').value = data.description;
        document.getElementById('price-modal').value = data.price;
        document.querySelector('.overlay').classList.toggle('target');
    });
}

function updateTransportation() {
    const title = document.getElementById('title-modal').value;
    const description = document.getElementById('description-modal').value;
    const price = document.getElementById('price-modal').value;
    const id = document.getElementById('id-modal').value;
    const updatedPermit = {
        id: id,
        from_to: title.trim(),
        description: description.trim(),
        price: Number(price),
    };

    updateTransportationEndpoint(updatedPermit).then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            addPermitsToPage();
            document.querySelector('.overlay').classList.remove('target');
            document.getElementById('title-modal').value = '';
            document.getElementById('description-modal').value = '';
            document.getElementById('price-modal').value = '';
            document.querySelector('.overlay').classList.remove('target');
            submit_create.removeEventListener('click', updateTransportation);
        }
    });
}